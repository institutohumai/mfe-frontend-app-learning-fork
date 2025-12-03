import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { CustomHeader, CustomSectionOutline } from '@src/humai';

const config = {
    pluginSlots: {
        'org.openedx.frontend.layout.header_learning.v1': {
            keepDefault: false,
            plugins: [
                {
                    op: PLUGIN_OPERATIONS.Insert,
                    widget: {
                        id: 'custom_header_component',
                        type: DIRECT_PLUGIN,
                        RenderWidget: CustomHeader,
                    },
                },
            ]
        },
        'org.openedx.frontend.layout.footer.v1': {
            plugins: [
                {
                    // Hide the default footer
                    op: PLUGIN_OPERATIONS.Hide,
                    widgetId: 'default_contents',
                }
            ]
        },
        'org.openedx.frontend.learning.course_home_section_outline.v1': {
            keepDefault: false,
            plugins: [
                {
                    op: PLUGIN_OPERATIONS.Insert,
                    widget: {
                        id: 'custom_section_outline_component',
                        type: DIRECT_PLUGIN,
                        RenderWidget: CustomSectionOutline,
                    },
                },
            ]
        },
    },
}

export default config;
