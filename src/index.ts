/**
 * Mikoto Entry Point (MEP)
 */

Error.stackTraceLimit = Infinity;

import bootloader from './bootloader'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function() {
  console.log('booting...\r')
  return bootloader()
}
