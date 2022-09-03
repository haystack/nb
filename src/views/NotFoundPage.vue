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
       <div class="main">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
            <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
            <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
        </svg>
        <h1>Page not found!</h1>
       </div>
        <div class="footer">
            <div class="container justify-content-center align-items-center h-100">
                <footer class="d-flex flex-wrap justify-content-between align-items-center h-100 pt-2">
                    <div class="col d-flex align-items-center justify-content-xs-center">
                        <a href="/" class="mb-3 me-2 mb-md-0 text-decoration-none lh-1">
                            <img src="/res/nb-logo.png" height="50">
                        </a>
                        <span class="mb-3 mb-md-0 ">by <a href="https://haystack.csail.mit.edu/" target="_blank">Haystack</a> @ <a href="https://web.mit.edu/" target="_blank">MIT</a> </span>
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
  name: "not-found-page",
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.header {
    background: #4a2270;
    height: 80px;
}

.header .btn:hover {
    color: #4a2270;
}

.main {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
    align-items: center;
}

.main svg {
    width: 30vw;
    color: #4a2270;
    max-width: 250px;
    min-width: 150px;
}

.main h1{
    margin-top: 3rem;
}
.footer {
    font-weight: 100;
    background: #60348a;
    border-bottom: 10px solid #4a2270;
    color: white;
    font-size: 0.8em;
}

.footer a {
    color: white;
}
</style>
