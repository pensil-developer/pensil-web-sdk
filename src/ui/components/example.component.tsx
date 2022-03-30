import React from 'react';

export function ExampleComponent({
    children
}: any) {
    return (
        <div className="ExampleComponent">
            {children}
        </div>
    )
}