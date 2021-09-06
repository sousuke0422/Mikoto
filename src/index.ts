/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * Mikoto Entry Point (MEP)
 */

Error.stackTraceLimit = Infinity;

import bootloader from './bootloader'

/**
 * start bootloader
 */
export default function() {
  console.log('booting...\r')
  return bootloader()
}
