import React from 'react';

export default function Scene3D({ isSpeaking = false }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
            <div 
                className="w-full h-full"
                style={{
                    backgroundImage: `
                        linear-gradient(var(--grid-color) 1px, transparent 1px),
                        linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    opacity: 'var(--grid-opacity)'
                }}
            />
        </div>
    );
}
