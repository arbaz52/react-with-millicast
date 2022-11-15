# React with Millicast

How to manage toggling of audio/video tracks.

## Demo

**You need to have a millicast account in order to use the demo.**
Required URL search parameters:

- streamName -> Stream Name
- publishingToken -> Publishing

---

<fieldset>
	<legend>Access the Demo</legend>
	<form action="https://arbaz52.github.io/react-with-millicast/publisher" method="GET" target="__blank">
		<label>Stream Name</label><br />
		<input type="text" name="streamName"/><br />
		<label>Publishing Token</label><br />
		<input type="text" name="publishingToken"/><br />
		<input type="submit" value="Take me to demo"><br />
	</form>
</fieldset>

---

### Create a broadcasting token

Follow the steps to create a broadcasting token, if you do not have the required parameters.

- Log into [Dolby Dashboard](https://dashboard.dolby.io/signin/).
- After logging in, goto [Dashboad](https://streaming.dolby.io/#/tokens) if you were not redirected to automatically.
- Goto "Live broadcast" tab
- Create a new broadcast token by clicking the "+" button on the right side of "Stream Tokens" heading.
- Once that is done, click on the token you have just created.
- Once there, goto "API" tab.
- Copy the "STREAM TOKEN" and "PUBLISHING TOKEN".
