/*
 * @jeftelabs/prompts
 *
 * (c) Jeftelabs
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { createError } from '@jeftelabs/exception'

export const E_PROMPT_CANCELLED = createError('Prompt cancelled', 'E_PROMPT_CANCELLED', 500)
