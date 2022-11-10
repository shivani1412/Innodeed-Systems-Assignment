import React, { ReactElement } from 'react';

// @ts-ignore
import { Block } from 'vcc-ui';
import { NavigationProps} from "../types/types";

const NavigationControl = ({fnc, forward, backward}: NavigationProps): ReactElement => {
    return (
        <div className="navigation-controls">
            <button title={backward ? `button disabled` : `move backward`} disabled={backward} onClick={() => fnc(0)}>
                <i className="icon icon-nav-chevron rotate-180">&nbsp;</i>
            </button>
            <button title={forward ? `button disabled` : `move forward`} disabled={forward} onClick={() => fnc(1)}>
                <i className="icon icon-nav-chevron">&nbsp;</i>
            </button>
        </div>
    );
}

export default NavigationControl;