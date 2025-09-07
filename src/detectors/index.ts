import { detectAppVersion } from './app_version'
import { detectDocumentAttributes } from './document_element_keys'
import { detectErrorTrace } from './error_trace'
import { detectEvalLengthInconsistency } from './eval_length'
import { detectFunctionBind } from './function_bind'
import { detectLanguagesLengthInconsistency } from './languages_inconsistency'
import { detectMimeTypesConsistent } from './mime_types_consistence'
import { detectNotificationPermissions } from './notification_permissions'
import { detectPluginsArray } from './plugins_array'
import { detectPluginsLengthInconsistency } from './plugins_inconsistency'
import { detectProcess } from './process'
import { detectProductSub } from './product_sub'
import { detectUserAgent } from './user_agent'
import { detectWebDriver } from './webdriver'
import { detectWebGL } from './webgl'
import { detectWindowExternal } from './window_external'
import { detectWindowSize } from './window_size'
import { detectDistinctiveProperties } from './distinctive_properties'
import { detectPlaywright } from './playwright_properties'
import { detectHighEntropyValues } from './high_entropy_values'
import { detectChromeDriverInjection } from './chromedriver_injection'
import { detectDevtools } from './devtools_detection'
import { detectFpWorkerValidation } from './fpworker_validation'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const detectors = {
  detectAppVersion,
  detectDocumentAttributes,
  detectErrorTrace,
  detectEvalLengthInconsistency,
  detectFunctionBind,
  detectLanguagesLengthInconsistency,
  detectNotificationPermissions,
  detectPluginsArray,
  detectPluginsLengthInconsistency,
  detectProcess,
  detectUserAgent,
  detectWebDriver,
  detectWebGL,
  detectWindowExternal,
  detectWindowSize,
  detectMimeTypesConsistent,
  detectProductSub,
  detectDistinctiveProperties,
  detectPlaywright,
  detectHighEntropyValues,
  detectChromeDriverInjection,
  detectDevtools,
  detectFpWorkerValidation,
}
