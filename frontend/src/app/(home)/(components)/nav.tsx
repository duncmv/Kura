import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClockRotateLeft, faBookmark, faArrowAltCircleUp, faUserCircle, faGear } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

/**
 * Renders a navigation component with icons based on the user type.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isInst - Indicates whether the user is an instructor or not.
 * @param {Function} props.setTab - A function to set the active tab.
 * @returns {JSX.Element} The rendered navigation component.
 */
export default function Nav({ isInst, setTab }: { isInst: boolean, setTab: any }): JSX.Element {
  // CSS classes for styling
  const active = ' text-blue-500';
  const inactive = ' hover:text-blue-300';
  const iconStyle = 'text-3xl cursor-pointer';

  // Icons configuration for instructor and individual users
  const icons = {
    ind: {
      icons: [
        { name: 'home', icon: faHome, active: true },
        { name: 'history', icon: faClockRotateLeft, active: false },
        { name: 'bookmark', icon: faBookmark, active: false },
        { name: 'settings', icon: faUserCircle, active: false }
      ]
    },
    inst: {
      icons: [
        { name: 'home', icon: faHome, active: true },
        { name: 'publish', icon: faArrowAltCircleUp, active: false },
        { name: 'profile', icon: faUserCircle, active: false },
        { name: 'settings', icon: faGear, active: false }
      ]
    }
  };

  // Get the current icons based on the user type
  const currIcons = isInst ? icons.inst.icons : icons.ind.icons;

  // State to manage the active icons
  const [iconState, setIconState] = useState(Object.values(currIcons));

  // Update the icon state when the user type changes
  useEffect(() => {
    const currIcons = isInst ? icons.inst.icons : icons.ind.icons;
    setIconState(Object.values(currIcons));
  }, []);

  // Handle icon click event
  const handleIconClick = (index: number) => {
    const updatediconState = iconState.map((icon, i) => {
      if (i === index) {
        setTab(icon.name);
        return { ...icon, active: true };
      } else {
        return { ...icon, active: false };
      }
    });

    setIconState(updatediconState);
  };

  // Render the list of icons
  let iconsList = iconState.map((icon, index) => {
    return (
      <FontAwesomeIcon
        key={index}
        icon={icon.icon}
        className={iconStyle + (icon.active ? active : inactive)}
        onClick={() => handleIconClick(index)}
      />
    );
  });

  return (
    <div className='flex flex-row justify-evenly items-center bg-white py-4 border max-w-[400px] min-[405px]:rounded-[10px] mx-auto shadow-md'>
      {iconsList}
    </div>
  );
}
  