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
                        <h1 class="display-5"><em><strong><span class="underline">Annotate</span></strong></em> course material online and <em><strong><span class="underline">discuss</span></strong></em> it with the class</h1>
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
                <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
                    <div class="col d-flex align-items-start">
                        <div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-input-cursor-text" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M5 2a.5.5 0 0 1 .5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.165 4.165 0 0 1 10.5 1.5a.5.5 0 0 1 0 1c-.638 0-1.177.213-1.564.434a3.49 3.49 0 0 0-.436.294V7.5H9a.5.5 0 0 1 0 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 0 1 0 1 4.165 4.165 0 0 1-2.06-.566A4.561 4.561 0 0 1 8 13.65a4.561 4.561 0 0 1-.44.285 4.165 4.165 0 0 1-2.06.566.5.5 0 0 1 0-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 0 1 0-1h.5V3.228a3.49 3.49 0 0 0-.436-.294A3.166 3.166 0 0 0 5.5 2.5.5.5 0 0 1 5 2z"/>
                                <path d="M10 5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4v1h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4v1zM6 5V4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4z"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Make a note</h2>
                            <p>Draw others' attention to something interesting. Drag to hilight.</p>
                        </div>
                    </div>
                    <div class="col d-flex align-items-start">
                        <div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-question-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Ask</h2>
                            <p>Don't understanding something? Hilight the text and and ask your class about it.</p>
                        </div>
                    </div>
                    <div class="col d-flex align-items-start">
                        <div class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-reply-fill" viewBox="0 0 16 16">
                                <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Answer</h2>
                            <p> You see a question and you know the answer?, just click it to answer it.</p>
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
                        <img property="image" src="https://static1.squarespace.com/static/530a5d6be4b0a1097b351015/t/59da034b9f7456baacd575aa/1507459928907/IMG_1943.JPG?format=750w" alt="" mv-uploads="../images/people" aria-label="Image" class="">
                        <h3>Jumana Almahmoud</h3>
                        <span>PhD Candidate</span>
                        <a href="mailto:jumanam@mit.edu" target="_blank">jumanam@mit.edu</a>
                    </div>
                    <div class="col">
                        <img property="image" src="https://haystack.csail.mit.edu/images/people/david-karger.jpg" alt="" mv-uploads="../images/people" aria-label="Image">
                        <h3>David Karger</h3>
                        <span>PI</span>
                        <a href="mailto:karger@mit.edu" target="_blank">karger@mit.edu</a>
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


.hero {
    background: #60348a;
    min-height: 300px;
    height: 70vh;
}

.hero .underline {
    box-shadow: inset 0px -15px 0px 0px #4a2270e0;
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
    font-weight: 100;
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
