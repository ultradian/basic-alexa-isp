# basic-alexa-isp
most basic Alexa skill code using node SDK

to use this you will have to go to IN-SKILL-PRODUCTS section of Alexa Dev console and create PRODUCTS

create node_modules by command `npm install` from inside `\src` folder

from that folder issue zip command `zip -r basicisp.zip * -x basicisp.zip`

then you can upload using CLI with `aws lambda update-function-code --function-name <lambda function name> --zip-file fileb://basicisp.zip`


Need to update the code to include register the `ApiClient` as per discussion at https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/issues/555

This generates a "TypeError", "errorMessage":
```
"Alexa.SkillBuilders.standard(...).addRequestHandlers(...).addRequestInterceptors(...).withApiClient is not a function",
```

So you have to use a `custom` Skillbuilder
