import React from 'react';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';

import messages from './messages';
import Tabs from '../generic/tabs/Tabs';
import { CoursewareSearch, CoursewareSearchToggle } from '../course-home/courseware-search';
import { useCoursewareSearchState } from '../course-home/courseware-search/hooks';

const CourseTabsNavigation = ({
  activeTabSlug, className, tabs,
}) => {
  const intl = useIntl();
  const { show } = useCoursewareSearchState();

  // Obtener usuario autenticado y roles
  const authenticatedUser = getAuthenticatedUser();
  const userRoles = authenticatedUser ? authenticatedUser.roles || [] : [];
  const isSuperuser = authenticatedUser && (authenticatedUser.administrator || userRoles.includes('staff') || userRoles.includes('superuser'));

  let filteredTabs = [];
  if (isSuperuser) {
    // Solo mostrar la tab "Instructor" si existe
    filteredTabs = tabs.filter(tab => tab.title === 'Instructor');
  } else {
    // Solo dejar activa la tab "Course" pero no mostrar ninguna
    filteredTabs = [];
  }

  // Si no es superuser, no renderizar tabs, pero mantener la estructura para la página estática
  return (
    <div id="courseTabsNavigation" className={classNames('course-tabs-navigation', className)}>
      <div className="container-xl">
        <div className="nav-bar">
          <div className="nav-menu">
            {isSuperuser && (
              <Tabs
                className="nav-underline-tabs"
                aria-label={intl.formatMessage(messages.courseMaterial)}
              >
                {filteredTabs.map(({ url, title, slug }) => (
                  <a
                    key={slug}
                    className={classNames('nav-item flex-shrink-0 nav-link', { active: slug === activeTabSlug })}
                    href={url}
                  >
                    {title}
                  </a>
                ))}
              </Tabs>
            )}
          </div>
          <div className="search-toggle">
            <CoursewareSearchToggle />
          </div>
        </div>
      </div>
      {show && <CoursewareSearch />}
    </div>
  );
};

CourseTabsNavigation.propTypes = {
  activeTabSlug: PropTypes.string,
  className: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
};

CourseTabsNavigation.defaultProps = {
  activeTabSlug: undefined,
  className: null,
};

export default CourseTabsNavigation;
