import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { useNavigate } from 'react-router-dom';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { Avatar, Dropdown } from '@openedx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import Section from '@src/course-home/outline-tab/section-outline/Section';

const UserToggle = React.forwardRef(({ children, onClick, style, onMouseEnter, onMouseLeave }, ref) => (
    <div
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {children}
    </div>
));

const CustomHeader = ({ courseTitle }) => {
    const navigate = useNavigate();
    const user = getAuthenticatedUser();
    const { LMS_BASE_URL, ACCOUNT_PROFILE_URL, LOGOUT_URL } = getConfig(); 


    const styles = {
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 2rem',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            fontFamily: "'Nunito', sans-serif",
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
        leftSection: {
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
        },
        backButton: {
            background: 'transparent',
            border: 'none',
            color: '#F59410',
            fontSize: '1.25rem',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '50%',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        courseTitle: {
            fontSize: '1.1rem',
            fontWeight: 700,
            margin: 0,
            color: '#ffffff',
        },
        centerSection: {
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
        },
        logo: {
            height: '32px',
            width: 'auto',
        },
        rightSection: {
            display: 'flex',
            alignItems: 'center',
        },
        userInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '8px',
            transition: 'background 0.2s ease',
        },
        username: {
            fontWeight: 600,
            fontSize: '0.95rem',
            color: '#ffffff',
        },
        dropdownToggle: {
            color: '#F59410',
            marginLeft: '0.25rem',
        },
        dropdownMenu: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '0.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
            animation: 'fadeInSlideDown 0.2s ease-out forwards',
            minWidth: '200px',
        },
        dropdownItem: {
            color: '#ffffff',
            fontFamily: "'Nunito', sans-serif",
            padding: '0.75rem 1rem',
            borderRadius: '4px',
            transition: 'all 0.2s ease',
            fontSize: '0.95rem',
        }
    };

    // Inject Nunito font and custom styles
    React.useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
      @keyframes fadeInSlideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .custom-dropdown-item:hover, .custom-dropdown-item:focus {
        background-color: rgba(245, 148, 16, 0.15) !important;
        color: #F59410 !important;
        text-decoration: none;
      }
      .custom-dropdown-menu {
        top: 100% !important;
        margin-top: 12px !important;
      }
      .logo-hover {
        transition: transform 0.3s ease;
      }
      .logo-hover:hover {
        transform: scale(1.1);
      }
      @media (max-width: 768px) {
        .header-container {
          padding: 0.75rem 1rem !important;
        }
        .username-text {
          display: none !important;
        }
        .course-title {
          font-size: 0.9rem !important;
          max-width: 250px;
          white-space: wrap;
        }
        .logo-section{
        display: none !important;}
      }
    `;
        document.head.appendChild(styleSheet);

        return () => {
            document.head.removeChild(link);
            document.head.removeChild(styleSheet);
        };
    }, []);

    return (
        <header style={styles.header} className="header-container">
            <div style={styles.leftSection}>
                <button
                    style={styles.backButton}
                    onClick={() => navigate(-1)}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(245, 148, 16, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    aria-label="Go back"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h1 style={styles.courseTitle} className="course-title">{courseTitle}</h1>
            </div>

      <div style={styles.centerSection} className='logo-section'>
        <a href={`${LMS_BASE_URL}/dashboard`}>
          <img src="/static/logo.webp" alt="Logo" className="logo-hover logo-img" style={styles.logo} />
        </a>
      </div>            <div style={styles.rightSection}>
                <Dropdown>
                    <Dropdown.Toggle
                        id="user-dropdown"
                        as={UserToggle}
                        style={styles.userInfo}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        <Avatar
                            src={user?.profile_image?.image_url_medium}
                            alt={user?.username || 'User'}
                            size="sm"
                        />
                        <span style={styles.username} className="username-text">{user?.username}</span>
                        <FontAwesomeIcon icon={faChevronDown} style={styles.dropdownToggle} />
                    </Dropdown.Toggle>
 
                    <Dropdown.Menu align="right" className="custom-dropdown-menu" style={styles.dropdownMenu}>
                        <Dropdown.Item className="custom-dropdown-item" href={`${LMS_BASE_URL}/`} style={styles.dropdownItem}>Inicio</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item" href={`${LMS_BASE_URL}/dashboard`} style={styles.dropdownItem}>Mis cursos</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item" href={`${ACCOUNT_PROFILE_URL}/u/${user?.username}`} style={styles.dropdownItem}>Perfil</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item" href={`${LOGOUT_URL}`} style={styles.dropdownItem}>Cerrar sesión</Dropdown.Item>
                    </Dropdown.Menu>
                    
                </Dropdown>
            </div>
        </header>
    );
};
 
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
                        RenderWidget: ({ courseTitle }) => (
                            <CustomHeader courseTitle={courseTitle} />
                        ),
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
                        RenderWidget: (props) => (
                            <>
                                <h1 className="d-xl-none">ee</h1>
                                <ol id="courseHome-outline" className="list-unstyled" style={{ paddingBottom: "10dvh" }}>
                                    {props.sectionIds.map((sectionId) => (
                                        <Section
                                            key={props.sectionId}
                                            defaultOpen={props.sections[sectionId].resumeBlock}
                                            expand={props.expandAll}
                                            section={props.sections[sectionId]}
                                        />
                                    ))}
                                </ol>
                            </>
                        ),
                    },
                },
            ]
        },
      


    },
}

export default config;
