import { GameEvent } from '../functions/event'
import { getStat, StatKeys } from '../functions/stat'
import { GlobalStateInterface } from '../GlobalStateProvider'
import { ChangeAmountActions } from '../types'

export const getSoberingUpEvent = (state: GlobalStateInterface): GameEvent => {
	return {
		name: 'soberingUp',
		unique: true,
		replaceOnConflict: true,
		type: 'repeatingHourly',
		minuteInTheHour: state.time.mins,
		changes: [{
			statKey: StatKeys.alcohol,
			action: ChangeAmountActions.subtract,
			value: 10
		}],
		deleteIf: (props) => {
			if (!props) throw new Error('Props missing for DeleteIf in SoberingUp event')
			if (!props.state) throw new Error('State missing from props for DeleteIf in SoberingUp event')
			return getStat(props.state)(StatKeys.alcohol).currentValue <= 0
		}
	}
}
