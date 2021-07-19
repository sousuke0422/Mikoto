/**
 * Mikoto Entry Point (MEP)
 */

Error.stackTraceLimit = Infinity;

import bootloader from './bootloader'

export default function () {
  console.log('booting...\r')
  return bootloader()
}
