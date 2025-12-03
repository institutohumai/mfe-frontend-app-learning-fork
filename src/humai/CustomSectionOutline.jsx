import React from 'react';
import Section from '@src/course-home/outline-tab/section-outline/Section';

const CustomSectionOutline = ({ sectionIds, sections, expandAll }) => (
    <>
        <h1 className="d-xl-none">ee</h1>
        <ol id="courseHome-outline" className="list-unstyled" style={{ paddingBottom: "10dvh" }}>
            {sectionIds.map((sectionId) => (
                <Section
                    key={sectionId}
                    defaultOpen={sections[sectionId].resumeBlock}
                    expand={expandAll}
                    section={sections[sectionId]}
                />
            ))}
        </ol>
    </>
);

export default CustomSectionOutline;

