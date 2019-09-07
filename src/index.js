const Alexa = require('ask-sdk');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    console.log('IN: LaunchRequestHandler');

    // entitled products are obtained by request interceptor and stored in the session attributes
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const entitledProducts = sessionAttributes.entitledProducts;

    if (entitledProducts && entitledProducts.length > 0) {
      // Customer owns one or more products
      return handlerInput.responseBuilder
        .speak(`Welcome. You have ${entitledProducts.map(item => item.name).join(', ')}`)
        .getResponse();
    }

    // No entitled products
    console.log('No entitledProducts');
    return handlerInput.responseBuilder
      .speak('You have no products.')
      .getResponse();
  },
}; // End LaunchRequestHandler

const EntitledProductsCheck = {
  async process(handlerInput) {
    if (handlerInput.requestEnvelope.session.new === true) {
      // new session, check to see what products are already owned.
      try {
        const locale = handlerInput.requestEnvelope.request.locale;
        const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
        const result = await ms.getInSkillProducts(locale);
        const entitledProducts = getAllEntitledProducts(result.inSkillProducts);
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.entitledProducts = entitledProducts;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      } catch (error) {
        console.log(`Error calling InSkillProducts API: ${error}`);
      }
    }
  },
};

exports.handler = Alexa.SkillBuilders.standard()
  .addRequestHandlers(
    LaunchRequestHandler,
    SessionEndedHandler,
  )
  .addRequestInterceptors(
    EntitledProductsCheck,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();