package services;

import java.io.IOException;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;

import beans.User;
import beans.UserType;
import dao.UserDAO;

@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

	private static final String REALM = "token not valid.";
	private static final String AUTHENTICATION_SCHEME = "Bearer";

	@Context
	private ResourceInfo resourceInfo;

	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {

		String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);

		if (!isTokenBasedAuthentication(authorizationHeader)) {
			abortWithUnauthorized(requestContext);
			return;
		}

		String token = authorizationHeader.substring(AUTHENTICATION_SCHEME.length()).trim();
		try {

			// Validate the token
			User user = validateToken(token);

			Class<?> resourceClass = resourceInfo.getResourceClass();
			List<UserType> classRoles = extractRoles(resourceClass);

			Method resourceMethod = resourceInfo.getResourceMethod();
			List<UserType> methodRoles = extractRoles(resourceMethod);

			try {
				if (methodRoles.isEmpty()) {
					checkPermissions(classRoles, user);
				} else {
					checkPermissions(methodRoles, user);
				}
			} catch (Exception e) {
				requestContext.abortWith(Response.status(Response.Status.FORBIDDEN).build());
			}
		} catch (Exception e) {
			abortWithUnauthorized(requestContext);
		}

	}

	private List<UserType> extractRoles(AnnotatedElement annotatedElement) {
		if (annotatedElement == null) {
			return new ArrayList<UserType>();
		} else {
			Secured secured = annotatedElement.getAnnotation(Secured.class);
			if (secured == null) {
				return new ArrayList<UserType>();
			} else {
				UserType[] allowedRoles = secured.value();
				return Arrays.asList(allowedRoles);
			}
		}
	}

	
	  private boolean isTokenBasedAuthentication(String authorizationHeader) {
		  return authorizationHeader != null && authorizationHeader.toLowerCase()
				  	.startsWith(AUTHENTICATION_SCHEME.toLowerCase() + " ");
		  }
	  
	
	private void abortWithUnauthorized(ContainerRequestContext requestContext) {
		requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED)
				.header(HttpHeaders.WWW_AUTHENTICATE, AUTHENTICATION_SCHEME + " realm=\"" + REALM + "\"").build());
	}

	private void checkPermissions(List<UserType> allowedRoles, User user) throws Exception {
		if (allowedRoles.isEmpty())
			return;

		for (UserType type : allowedRoles) {
			if (type == user.getRole())
				return;
		}

		throw new Exception();
	}

	private User validateToken(String token) throws Exception {
		try {
			if (token != null) {
				Algorithm algorithm = Algorithm.HMAC256("yZJsnXojT3");
				JWTVerifier verifier = JWT.require(algorithm).withIssuer("jwtauth").withAudience("audience").build(); // Reusable verifier
																								// instance
				DecodedJWT jwt = verifier.verify(token);

				Claim userId = jwt.getClaim("username");
				System.out.println("Ovo sam uspeo");
				// Find user by token subject(id).
				UserDAO userDao = new UserDAO();
				return userDao.getUserByUsername(userId.asString());
			}
		} catch (Exception e) {
			throw new Exception();
		}
		return null;
	}
}
