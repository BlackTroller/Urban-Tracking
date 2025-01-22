//@ts-nocheck
import lostState from './error_lost_clean.svg'

export const MiniLogo = () => {

    return(
        <svg version="1.0" viewBox="0 0 58 46" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" >
            <g transform="matrix(1.2406 0 0 1.2406 -6.9784 -.11345)">
                <polygon transform="matrix(.17665 0 0 .17665 -21.174 -26.958)" points="234.7 258.1 185.3 208.7 185.3 307.4 234.7 356.8" fill="#009bcc"/>
                <rect transform="rotate(-45)" x="1.1613" y="15.174" width="12.33" height="37.009" fill="#00b1e5" strokeWidth=".17665"/>
                <polygon transform="matrix(.17665 0 0 .17665 -21.174 -26.958)" points="234.7 258.1 234.7 356.8 284 307.4" fill="#3e7792"/>
                <polygon transform="matrix(.17665 0 0 .17665 -21.174 -26.958)" points="333.4 159.3 333.4 258.1 284 208.7" fill="#3e7792"/>
                <polygon transform="matrix(.17665 0 0 .17665 -21.174 -26.958)" points="333.4 159.3 382.8 208.7 382.8 307.4 333.4 258.1" fill="#009bcc"/>
            </g>
        </svg>
    )
}

export const BigLogo = () => {

    return(
    <svg version="1.0" viewBox="0 0 240 46" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" >
        <g transform="matrix(.9254 0 0 .9254 -142.78 -238.7)">
            <polygon  points="156.4 293 166.6 303.3 166.6 282.8 156.4 272.5" fill="#009DCD"/>
            <rect  transform="matrix(.7071 -.7071 .7071 .7071 -148.14 207.91)" x="169.6" y="261" width="14.5" height="43.5" fill="#00b3e6"/>
            <polygon  points="176.9 293 166.6 282.8 166.6 303.3" fill="#3e7692"/>
            <polygon  points="176.9 272.5 187.2 262.3 187.2 282.8" fill="#3e7692"/>
            <polygon  points="197.4 293 187.2 282.8 187.2 262.3 197.4 272.5" fill="#009dcd"/>
            <g fill="#51545d">
                <path  fill="#51545D" d="m235.8 278.8-6.8 8.5-6.5-8.5v14.2h-4.6v-20.5h5.2l6 7.9 6-7.9h5.2v20.5h-4.6v-14.2z"/>
                <path  fill="#51545D" d="m307.5 278.8-6.8 8.5-6.5-8.5v14.2h-4.6v-20.5h5.2l6 7.9 6-7.9h5.2v20.5h-4.6v-14.2z"/>
                <path  fill="#51545D" d="m250.8 293v-20.5h4.5v20.5z"/>
                <path  fill="#51545D" d="m270.2 276.6h-6.2v-4.1h17v4.1h-6.2v16.4h-4.5v-16.4z"/>
                <path  fill="#51545D" d="m330.5 280.6 5.2-8.1h5.2v0.2l-8.2 12.1v8.1h-4.6v-8.1l-7.9-12.1v-0.2h5.3z"/>
                <path  fill="#51545D" d="m363.3 285.8-0.3-6.4v-6.9h4.6v20.5h-3.9l-10.2-13.1 0.2 6.7v6.4h-4.7v-20.5h3.9z"/>
                <path  fill="#51545D" d="m378 293v-20.5h4.5v20.5z"/>
                <path  fill="#51545D" d="m401.4 272.5c7.1 0 10.2 4.7 10.2 10.1s-3 10.4-10.2 10.4h-8.4v-20.5zm-3.9 16.3h3.9c4.5 0 5.7-3.3 5.7-6.2s-1.4-5.9-5.7-5.9h-3.9z"/>
            </g>
        </g>
    </svg>
    );
};


export const LostState = () => {
    return (<img src={lostState} alt="lostState"/>)
}
