var navbar1 = document.getElementById("completenavBar")

navbar1.innerHTML= `
<div class="navbar-menu">
<a href="../index.html"><button>Home</button></a>
<button>Characters</button>
<a href="locations.html"><button>Locations</button></a>
<a href="./episode.html"><button>Episode</button></a>
</div>
<div class="navbar">
<div class="dropdown">
  <button class="dropbtn">
    <label class="navbar-toggle">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </label>
  </button>
  <div class="dropdown-content">
    <div class="dropdown">
      <a href="../index.html">Home</a>
      <a href="./locations.html">locations</a>
      <a href="./episode.html">Episode</a>
    </div>
  </div>
</div>
</div>
`