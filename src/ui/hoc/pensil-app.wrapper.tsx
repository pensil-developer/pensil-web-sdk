import React from 'react';
import { PensilApp } from "../container/pensil-app.container"

// a hoc to wrap component in pensil app
export function withPensilWrapper(Component: any) {
    return function (props: any) {
        return (
            <PensilApp>
                <Component {...props} />
            </PensilApp>
        )
    }
}