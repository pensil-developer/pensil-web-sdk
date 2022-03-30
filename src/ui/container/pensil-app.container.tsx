import React from 'react';

export function PensilApp({ children }: { children: JSX.Element[] | JSX.Element }) {
    return (
        <div className="pensil-web-sdk">
            {children}
        </div>
    )
}