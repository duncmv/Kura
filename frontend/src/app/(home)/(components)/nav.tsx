import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClockRotateLeft, faBookmark, faArrowAltCircleUp, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export default function Nav ({isInst, setTab}: {isInst: boolean, setTab: any}) {
    const active = ' text-blue-500'; 
    const inactive = ' hover:text-blue-300';
    const iconStyle = 'text-3xl cursor-pointer';
    const icons = {ind: 
                    {icons: [{name: 'home', icon: faHome, active: true},
                    {name: 'history', icon: faClockRotateLeft, active: false}, 
                    {name: 'bookmark', icon: faBookmark, active: false}]}, 
                  inst: 
                    {icons: [{name: 'home', icon: faHome, active: true},
                    {name: 'publish', icon: faArrowAltCircleUp, active: false},
                    {name: 'profile', icon: faUserCircle, active: false}]}};
  
      const currIcons = isInst ? icons.inst.icons : icons.ind.icons;
      
      
      const [iconState, setIconState] = useState(Object.values(currIcons));
  
      useEffect(() => {
        const currIcons = isInst ? icons.inst.icons : icons.ind.icons;
        setIconState(Object.values(currIcons));
      }, [isInst]);
      
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
      
      let iconsList = iconState.map((icon, index) => {
        return (
          <FontAwesomeIcon key={index} icon={icon.icon} className={iconStyle + (icon.active ? active : inactive)} onClick={() => handleIconClick(index)} />
        );
      });
    
    return (
      <div className='w-full flex flex-row justify-evenly items-center bg-white py-4 border max-w-[400px] min-[405px]:rounded-[10px] mx-auto shadow-md'>
        {iconsList}
      </div>
    );
  }
  