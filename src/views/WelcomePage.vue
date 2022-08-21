<template>
    <div class=" app-wrapper">
        <div class="header">
            <div class="container">
                <div class="row justify-content-between align-items-center">
                    <div class="col logo" >
                        <a href="/"><img src="/res/nb-logo.png" height="80"></a>
                    </div>
                    <div class="col link">
                        <ul class="nav justify-content-end">
                            <li class="nav-item">
                                <a v-if="!isLoggedIn" class="btn btn-outline-light" aria-current="page" href="/login">Login / Register</a>
                                <a v-else class="btn btn-outline-light" aria-current="page" href="/dashboard">Dashboard</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero">
            <div class="container h-100">
                <div class="row justify-content-center align-items-center h-100 px-4 py-5">
                    <div class="col text ps-5">
                        <h1 class="display-5"><em><strong><span class="underline">Annotate</span></strong></em> online material <em><strong><span class="underline">discuss</span></strong></em> and <em><strong><span class="underline">socialize</span></strong></em> with other readers!</h1>
                    </div>
                    <div class="col-xl-6 col-lg-8">
                        <div class="ratio ratio-16x9">
                            <iframe src="https://www.youtube.com/embed/G0ghiJWkHYY" ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="features">
            <div class="container px-4 py-5 justify-content-center align-items-center h-100">
                <div class="row my-lg-5 g-4 py-lg-5 row-cols-1 row-cols-lg-3">
                    <div class="col my-3  d-flex align-items-start">
                        <div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-input-cursor-text" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M5 2a.5.5 0 0 1 .5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.165 4.165 0 0 1 10.5 1.5a.5.5 0 0 1 0 1c-.638 0-1.177.213-1.564.434a3.49 3.49 0 0 0-.436.294V7.5H9a.5.5 0 0 1 0 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 0 1 0 1 4.165 4.165 0 0 1-2.06-.566A4.561 4.561 0 0 1 8 13.65a4.561 4.561 0 0 1-.44.285 4.165 4.165 0 0 1-2.06.566.5.5 0 0 1 0-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 0 1 0-1h.5V3.228a3.49 3.49 0 0 0-.436-.294A3.166 3.166 0 0 0 5.5 2.5.5.5 0 0 1 5 2z"/>
                                <path d="M10 5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4v1h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4v1zM6 5V4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4z"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Annotate</h2>
                            <p>Drag to highlight passages and attach your own notes in text or audio format.</p>
                        </div>
                    </div>
                    <div class="col my-3 d-flex align-items-start">
                        <div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-question-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Ask</h2>
                            <p>Don't understanding something? Highlight  the text and and ask your class about it.</p>
                        </div>
                    </div>
                    <div class="col my-3 d-flex align-items-start">
                        <div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-reply" viewBox="0 0 16 16">
                                <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Answer</h2>
                            <p>You see a question and you know the answer?, just click it to answer it.</p>
                        </div>
                    </div>
                    <div class="col my-3 d-flex align-items-start">
                        <div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-chat-right-quote" viewBox="0 0 16 16">
                                <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                                <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Socialize</h2>
                            <p>Interact with other readers in real-time.</p>
                        </div>
                    </div>
                    <div class="col my-3 d-flex align-items-start">
                        <div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-lamp" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M5.04.303A.5.5 0 0 1 5.5 0h5c.2 0 .38.12.46.303l3 7a.5.5 0 0 1-.363.687h-.002c-.15.03-.3.056-.45.081a32.731 32.731 0 0 1-4.645.425V13.5a.5.5 0 1 1-1 0V8.495a32.753 32.753 0 0 1-4.645-.425c-.15-.025-.3-.05-.45-.08h-.003a.5.5 0 0 1-.362-.688l3-7ZM3.21 7.116A31.27 31.27 0 0 0 8 7.5a31.27 31.27 0 0 0 4.791-.384L10.171 1H5.83L3.209 7.116Z"/>
                                <path d="M6.493 12.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.052.075l-.001.004-.004.01V14l.002.008a.147.147 0 0 0 .016.033.62.62 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.62.62 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411Z"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Spotlight</h2>
                            <p>Draw others’ attention to some annotations by spotlighting them.</p>
                        </div>
                    </div>
                    <div class="col my-3 d-flex align-items-start">
                        <div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Filter</h2>
                            <p>View annotations by modifying the different filters based on your preference.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="team">
            <div class="container h-100 text-center">
                <div class="row justify-content-center align-items-center h-100 px-4 py-5">
                    <h2 class="mb-5">Research Team</h2>
                    <div class="col">
                        <img property="image" src="https://static1.squarespace.com/static/530a5d6be4b0a1097b351015/t/59da034b9f7456baacd575aa/1507459928907/IMG_1943.JPG?format=750w" aria-label="Image">
                        <h3>Jumana Almahmoud</h3>
                        <span>PhD Candidate @ MIT</span>
                        <span>NB Maintainer</span>
                        <a href="mailto:jumanam@mit.edu" target="_blank">jumanam@mit.edu</a>
                    </div>
                    <div class="col">
                        <img property="image" src="https://haystack.csail.mit.edu/images/people/david-karger.jpg" aria-label="Image">
                        <h3>David Karger</h3>
                        <span>PI @ MIT</span>
                        <a href="mailto:karger@mit.edu" target="_blank">karger@mit.edu</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="team">
            <div class="container h-100 text-center">
                <div class="row justify-content-center align-items-center h-100 px-4 py-5">
                    <h2 class="mb-5">Research Collaborators</h2>
                    <div class="col">
                        <img property="image" src=" https://bme.ucdavis.edu/sites/g/files/dgvnsk5766/files/styles/sf_profile/public/images/person/uc-davis-biomedical-engineering-assistant-professor-marc-facciotti.jpg?h=09f64210&itok=6h76tTfb" aria-label="Image">
                        <h3>Marc T. Facciotti</h3>
                        <span>Professor @ UCDavis</span>
                        <span>Biomedical Engineering</span>
                        <a href="mailto:mtfacciotti@ucdavis.edu" target="_blank">mtfacciotti@ucdavis.edu</a>
                    </div>
                    <div class="col">
                        <img property="image" src="https://biology.ucdavis.edu/sites/g/files/dgvnsk12066/files/styles/sf_profile/public/media/images/Michele-Igo-College-of-Biological-Sciences-UC-Davis-1-2_PROFILE.jpg?h=10236ef4&itok=fvBzkO6r" aria-label="Image">
                        <h3>Michele M. Igo</h3>
                        <span>Professor @ UCDavis</span>
                        <span>Microbiology and Molecular Genetics</span>
                        <a href="mailto:mmigo@ucdavis.edu" target="_blank">mmigo@ucdavis.edu</a>
                    </div>
                    <div class="col">
                        <img property="image" src="https://media-exp1.licdn.com/dms/image/C5103AQHuVyGeXRa9zw/profile-displayphoto-shrink_800_800/0/1516832347931?e=2147483647&v=beta&t=GQZLzlbkr1cYdFPVDnTajWGBoDXEX6frz95hHVoeCXY" aria-label="Image">
                        <h3>Kamali Sripathi</h3>
                        <span>Assistant Project Scientist @ UCDavis</span>
                        <a href="mailto:ksripathi@ucdavis.edu" target="_blank">ksripathi@ucdavis.edu</a>
                    </div>

                </div>
            </div>
        </div>
        <div class="funding">
            <div class="container h-100 text-center">
                <div class="row justify-content-center align-items-center h-100 px-4 py-5">
                    <h2 class="mb-5">Funding</h2>
                    <div class="col">
                        <a href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=1915724" target="_blank"><img property="image" src="https://www.nsf.gov/images/logos/NSF_4-Color_bitmap_Logo.png" aria-label="Image"></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="container justify-content-center align-items-center h-100">
                <footer class="d-flex flex-wrap justify-content-between align-items-center h-100 pt-2">
                    <div class="col d-flex align-items-center justify-content-xs-center">
                        <a href="/" class="mb-3 me-2 mb-md-0 text-decoration-none lh-1">
                            <img src="/res/nb-logo.png" height="50">
                        </a>
                        <span class="mb-3 mb-md-0 ">A project of the <a href="https://haystack.csail.mit.edu/" target="_blank">Haystack</a> Group at <a href="https://web.mit.edu/" target="_blank">MIT</a> </span>
                    </div>
                    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li class="ms-3">
                            <a href="https://github.com/haystack/nb" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                            </a>
                        </li>
                        <li class="ms-3">
                            <a href="https://www.youtube.com/channel/UCSEl_8_2jKvT3QcoKdNjTmw" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
                                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                                </svg>
                            </a>
                        </li>
                        <li class="ms-3">
                            <a href="https://www.tiktok.com/@nb2.mit" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-tiktok" viewBox="0 0 16 16">
                                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import "bootstrap/dist/css/bootstrap.css";

export default {
  name: "welcome-page",
  data() {
    return {
      user: null,
      messages: null,
      isLoggedIn: false,
    };
  },
  mounted: function () {
    try {
      const token = localStorage.getItem("nb.user");
      if (token) {
        const decoded = VueJwtDecode.decode(token);
        if (decoded.user.username && decoded.user.username !== "") {
          this.isLoggedIn = true
        }
      }
    } catch (error) {
      console.error(error, "error from decoding token");
    }
  },
  components: {},
};
</script>

<style scoped>
.app-wrapper {
    min-height:100vh;
}

.header {
    background: #4a2270;
    height: 80px;
}

.header .btn:hover {
    color: #4a2270;
}

.hero {
    background: #60348a;
    min-height: 300px;
    height: 70vh;
}

.hero .underline {
    box-shadow: inset 0px -15px 0px 0px #4a2270e0;
}

.hero .underline.highlight {
    box-shadow: inset 0px -49px 0px 0px #ffcc01b0;
    color: #000000;
}

.hero .text h1 {
    color: white;
}

.features {
    background: #f8f9fa;
}

.team {
    background: #e1e6eb;
    min-height: 300px;
    cursor: default;
}

.team img {
    display: inline-block;
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    -o-object-fit: cover;
    object-fit: cover;
}

.team h3 {
    font-size: 1.25rem;
    margin-top: 20px;
}

.team span {
    display: block;
    font-weight: 400;
    font-size: 0.9rem;
    margin-top: -5px;
}

.team a {
    color: #60348a;
    font-size: 0.8rem;
    display: block;
    margin-top: -5px;
    margin-bottom: 20px;
}

.funding {
    background: #c2cbd5;
}

.funding img {
    width: 10rem;
    height: 10rem;
}

.footer {
    background: #60348a;
    border-bottom: 10px solid #4a2270;
    color: white;
    font-size: 0.8em;
}

.footer a {
    font-weight: bold;
    color: white;
}
</style>
