import React from 'react';
import Section from '@src/course-home/outline-tab/section-outline/Section';

const CustomSectionOutline = (props) => (
    <>
        <ol id="courseHome-outline" className="list-unstyled" style={{ paddingBottom: "10dvh" }}>
            {props.sectionIds.map((sectionId) => (
                <Section
                    key={sectionId}
                    defaultOpen={props.sections[sectionId].resumeBlock}
                    expand={props.expandAll}
                    section={props.sections[sectionId]}
                />
            ))}
        </ol>
    </>
);

export default CustomSectionOutline;
