import React from 'react';
import { Button } from '@openedx/paragon';

const CustomButton = React.forwardRef(({ children, style, customVariant = 'orange', ...props }, ref) => {
    React.useEffect(() => {
        const linkId = 'nunito-font-link';
        if (!document.getElementById(linkId)) {
            const link = document.createElement('link');
            link.id = linkId;
            link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    }, []);

    const baseStyle = {
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 700,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease',
        ...style,
    };

    let variantStyles = {};
    let cssRules = '';

    if (customVariant === 'orange') {
        variantStyles = {
            backgroundColor: '#F59410',
            borderColor: '#F59410',
        };
        cssRules = `
            .humai-custom-button-orange {
                color: #ffffff !important;
            }
            .humai-custom-button-orange:hover, .humai-custom-button-orange:focus, .humai-custom-button-orange:active {
                background-color: #d6800e !important;
                border-color: #d6800e !important;
                color: #ffffff !important;
                transform: translateY(-1px);
                box-shadow: 0 4px 6px rgba(0,0,0,0.15) !important;
            }
        `;
    } else if (customVariant === 'purple-transparent') {
        const purpleColor = '#79168fd0';
        variantStyles = {
            backgroundColor: 'transparent',
            borderColor: purpleColor,
            borderWidth: '1px',
            borderStyle: 'solid',
        };
        cssRules = `
            .humai-custom-button-purple-transparent {
                color: ${purpleColor} !important;
            }
            .humai-custom-button-purple-transparent:hover, .humai-custom-button-purple-transparent:focus, .humai-custom-button-purple-transparent:active {
                background-color: ${purpleColor} !important;
                border-color: ${purpleColor} !important;
                color: #ffffff !important;
                transform: translateY(-1px);
                box-shadow: 0 4px 6px rgba(0,0,0,0.15) !important;
            }
        `;
    }

    return (
        <>
            <style>
                {cssRules}
            </style>
            <Button
                ref={ref}
                className={`humai-custom-button-${customVariant}`}
                style={{ ...baseStyle, ...variantStyles }}
                {...props}
            >
                {children}
            </Button>
        </>
    );
});

export default CustomButton;
