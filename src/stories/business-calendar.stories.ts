import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import {BusinessCalendarModule} from '../../projects/business-calendar/src/lib/business-calendar.module';

storiesOf('am-business-calendar', module)
    .addDecorator(
        moduleMetadata({
            imports: [BusinessCalendarModule],
        }),
    )
    .addDecorator(withKnobs)
    .add('Business calendar', () => {
        return {
            template: `<am-business-calendar></am-business-calendar>`,
        };
    });
