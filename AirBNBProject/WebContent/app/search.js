Vue.component("search", {
    
    template:'
    <form class="naslov" action="http://www.google.com">
        <input type="text" id="city" name="search" placeholder="Unesite grad ili državu">
        <input type="date" id="date" name="search"  placeholder="Odaberite datum">
        <input type='number' min="0" id="guests" name="search" placeholder="Broj gostiju">
        <input type="number" min="0" id="price" name="search" placeholder="Cena">
        <input type="number" min="0" id="rooms" name="search" placeholder="Broj soba">
        <input type="submit" id="search" value="Pretraži">
    </form>
'
});