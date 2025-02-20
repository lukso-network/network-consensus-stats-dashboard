import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ILogoProps {
    network: string;
}

export const Logo: React.FC<ILogoProps> = (props) => (
    <div className="flex items-center px-4">
        <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <g id="Stats" stroke="none" strokeWidth="1" fill="none"
                fillRule="evenodd">
                <g id="StatsView" transform="translate(-12.000000, -109.000000)">
                    <g id="topBar" transform="translate(0.000000, 97.000000)">
                        <g id="Group-5" transform="translate(12.000000, 12.000000)">
                            <path
                                d="M16,0 L16,0 C24.836556,-1.623249e-15 32,7.163444 32,16 L32,16 C32,24.836556 24.836556,32 16,32 L16,32 C7.163444,32 1.082166e-15,24.836556 0,16 L0,16 C-1.082166e-15,7.163444 7.163444,1.623249e-15 16,0 Z"
                                id="Rectangle" fill="#FFFFFF"></path>
                            <path
                                d="M22.39984,12.80008 C20.63248,12.80008 19.20016,14.2324 19.20016,16.00024 C19.20016,17.76712 20.63248,19.19992 22.39984,19.19992 C24.16768,19.19992 25.6,17.76712 25.6,16.00024 C25.6,14.2324 24.16768,12.80008 22.39984,12.80008"
                                id="Fill-1" fill="#0F1927"></path>
                            <path
                                d="M16,19.20016 C14.23264,19.20016 12.79984,17.76736 12.79984,16 C12.79984,14.23264 14.23264,12.80032 16,12.80032 C17.76736,12.80032 19.20016,11.36752 19.20016,9.60016 C19.20016,7.8328 17.76736,6.4 16,6.4 C14.23264,6.4 12.79984,7.8328 12.79984,9.60016 C12.79984,11.36752 11.36752,12.80032 9.60016,12.80032 C7.83232,12.80032 6.4,14.23264 6.4,16 C6.4,17.76736 7.83232,19.20016 9.60016,19.20016 C11.36752,19.20016 12.79984,20.63248 12.79984,22.39984 C12.79984,24.16768 14.23264,25.6 16,25.6 C17.76736,25.6 19.20016,24.16768 19.20016,22.39984 C19.20016,20.63248 17.76736,19.20016 16,19.20016"
                                id="Fill-3" fill="#2774FE"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        <div className="hidden sm:flex items-center">
            <div className="ml-4 flex">
                <p className="logo-text font-sm font-bold text-white">LUKSO Stats</p>
            </div>
            {
                props.network &&
                <>
                    <FontAwesomeIcon icon="heart" className="mx-2 text-red-500" />
                    <p className="text-white font-sm">
                        {props.network.toLowerCase()}
                    </p>
                </>
            }
        </div>
    </div>
);
