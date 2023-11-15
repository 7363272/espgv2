// Searching 

/* ---- particles.js config ---- */

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area":1000
      }
    },
    "color": {
      "value": ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"]
    },
    
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#fff"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.6,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 120,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": false
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  window.navigator.serviceWorker
    .register("./sw.js", {
      scope: __uv$config.prefix,
    })
    .then(() => {
      let url = input.value.trim();
      if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
      else if (!(url.startsWith("https://") || url.startsWith("http://")))
        url = "http://" + url;
      sessionStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
      location.href = "go";
    });
});


function go(value) {
    let iframe = document.querySelector(".iframe.active");
    window.navigator.serviceWorker
      .register("./sw.js", {
        scope: __uv$config.prefix,
      })
      .then(() => {
        let url = value.trim();
        if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
        else if (!(url.startsWith("https://") || url.startsWith("http://")))
          url = "https://" + url;
        //pass the encoded url to the second page
        sessionStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
        location.href = "go";
      });
  }
  
  function blank(value) {
    let iframe = document.querySelector(".iframe.active");
    window.navigator.serviceWorker
      .register("./sw.js", {
        scope: __uv$config.prefix,
      })
      .then(() => {
        let url = value.trim();
        if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
        else if (!(url.startsWith("https://") || url.startsWith("http://")))
          url = "https://" + url;
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
      });
  }
  
  function isUrl(val = "") {
    if (
      /^http(s?):\/\//.test(val) ||
      (val.includes(".") && val.substr(0, 1) !== " ")
    )
      return true;
    return false;
  }

        function AB() {
            let inFrame;

            try {
                inFrame = window !== top;
            } catch (e) {
                inFrame = true;
            }

            if (!inFrame && !navigator.userAgent.includes("Firefox")) {
                const popup = open("about:blank", "_blank");
                if (!popup || popup.closed) {
                    alert("Please allow popups and redirects.");
                } else {
                    const doc = popup.document;
                    const iframe = doc.createElement("iframe");
                    const style = iframe.style;
                    const link = doc.createElement("link");
                    const name = localStorage.getItem("name") || "My Drive - Google Drive";
                    const icon = localStorage.getItem("icon") || "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png";
                    doc.title = name;
                    link.rel = "icon";
                    link.href = icon;
                    iframe.src = location.href;
                    style.position = "fixed";
                    style.top = style.bottom = style.left = style.right = 0;
                    style.border = style.outline = "none";
                    style.width = style.height = "100%";
                    doc.head.appendChild(link);
                    doc.body.appendChild(iframe);
                    location.replace("https://classroom.google.com");
                }
            }
        }
