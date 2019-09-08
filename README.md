# basic-alexa-isp
most basic Alexa skill code using node SDK

have to go to IN-SKILL-PRODUCTS section of Alexa Dev console and create PRODUCTS

create node_modules by command `npm install` from inside `\src` folder

from that folder issue zip command `zip -r basicisp.zip * -x basicisp.zip`

then you can upload using CLI with `aws lambda update-function-code --function-name <lambda function name> --zip-file fileb://basicisp.zip`
