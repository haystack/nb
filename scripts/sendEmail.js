const Email = require('../utils/email')

const emailHtml = `
<body  style=" padding: 30px 15px; color: #4a2270; font-family: sans-serif;">
  <header style="display: flex; text-align: center; height: 70px; background: #4a2270; align-items: center; margin: 0 0 20px 0;">
    <a href="https://nb.mit.edu/" target="_blank">
  		<img  style="height: 70px" src="https://nb.mit.edu/res/nb-logo.png"/>
    </a>
  </header>
  <content style="display: flex; flex-direction: column; margin: 1rem;  min-height: 500px; padding: 10px 20px; align-items: center; text-algin:center;">
  	<h1>Hello from NB!</h1>
    <p style="color: #000000;">
      This is a content 
    </p>
  </content>
  <footer style="display: flex; text-align: center; height: 10px; background: #4a2270; align-items: center; margin: 0 0 30px 0;"><footer>
</body>
`


async function run() {
    const email = new Email().to('jumanam@mit.edu')
                            .subject('Test 3')
                            .text('NB Text email')
                            .html(emailHtml)
    await email.send()
}

run()