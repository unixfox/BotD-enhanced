import getAppVersion from './app_version'
import getDocumentElementKeys from './document_element_keys'
import getErrorTrace from './error_trace'
import getEvalLength from './eval_length'
import getFunctionBind from './function_bind'
import getLanguages from './languages'
import areMimeTypesConsistent from './mime_types_consistence'
import getNotificationPermissions from './notification_permissions'
import getPluginsArray from './plugins_array'
import getPluginsLength from './plugins_length'
import getProcess, { ProcessPayload } from './process'
import getProductSub from './product_sub'
import getRTT from './rtt'
import getUserAgent from './user_agent'
import getWebDriver from './webdriver'
import getWebGL from './webgl'
import getWindowExternal from './window_external'
import getWindowSize, { WindowSizePayload } from './window_size'
import checkDistinctiveProperties, { DistinctivePropertiesPayload } from './distinctive_properties'
import getPlaywrightProperties, { PlaywrightPropertiesPayload } from './playwright_properties'
import getHighEntropyValues, { HighEntropyValuesPayload } from './high_entropy_values'
import getChromeDriverInjection, { ChromeDriverInjectionPayload } from './chromedriver_injection'
import getDevtoolsDetection, { DevtoolsDetectionPayload } from './devtools_detection'
import getFpWorkerValidation, { FpWorkerValidationPayload } from './fpworker_validation'
import { getBrowserEngineKind, getBrowserKind, getDocumentFocus, isAndroid } from '../utils/browser'

export const sources = {
  android: isAndroid,
  browserKind: getBrowserKind,
  browserEngineKind: getBrowserEngineKind,
  documentFocus: getDocumentFocus,
  userAgent: getUserAgent,
  appVersion: getAppVersion,
  rtt: getRTT,
  windowSize: getWindowSize,
  pluginsLength: getPluginsLength,
  pluginsArray: getPluginsArray,
  errorTrace: getErrorTrace,
  productSub: getProductSub,
  windowExternal: getWindowExternal,
  mimeTypesConsistent: areMimeTypesConsistent,
  evalLength: getEvalLength,
  webGL: getWebGL,
  webDriver: getWebDriver,
  languages: getLanguages,
  notificationPermissions: getNotificationPermissions,
  documentElementKeys: getDocumentElementKeys,
  functionBind: getFunctionBind,
  process: getProcess,
  distinctiveProps: checkDistinctiveProperties,
  playwrightProperties: getPlaywrightProperties,
  highEntropyValues: getHighEntropyValues,
  chromedriverInjection: getChromeDriverInjection,
  devtoolsDetection: getDevtoolsDetection,
  fpworkerValidation: getFpWorkerValidation,
}

export { WindowSizePayload, ProcessPayload, DistinctivePropertiesPayload, PlaywrightPropertiesPayload, HighEntropyValuesPayload, ChromeDriverInjectionPayload, DevtoolsDetectionPayload, FpWorkerValidationPayload }
