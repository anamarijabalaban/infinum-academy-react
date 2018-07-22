import StarTrek from './images/Star_Trek:_Voyager.jpg'
import ITCrowd from './images/IT_Crowd.jpg'
import OrangeIsTheNewBlack from './images/Orange_is_the_new_black.jpg'
import SouthPark from './images/South_Park.jpg'
import TheSimpsons from './images/The_Simpsons.jpg'
import Xfiles from './images/X-Files.jpg'
import ShowsLogo from './images/img-logo-horizontal@3x.png'
import FacebookLogo from './images/ic-facebook@3x.png'
import LinkedInLogo from './images/ic-linkedin@3x.png'
import TwitterLogo from './images/ic-twitter@3x.png'
import PasswordEye from './images/ic-akcije-show-password-red@3x.png'
import ThumbUp from './images/thumbs-up.png'
import ThumbDown from './images/thumbs-down.png'
import ThumbUpB from './images/thumbs-up-black.png'
import ThumbDownB from './images/thumbs-down-black.png'
import Episode from './images/episode.jpg'

const imgs = {
    'Star Trek: Voyager': StarTrek,
    'IT Crowd': ITCrowd,
    'Orange is the new black': OrangeIsTheNewBlack,
    'South Park': SouthPark,
    'The Simpsons': TheSimpsons,
    'X-Files': Xfiles,
    'logo': ShowsLogo,
    'facebook': FacebookLogo,
    'linkedin': LinkedInLogo,
    'twitter': TwitterLogo,
    'passEye':PasswordEye,
    'thumbUp': ThumbUp,
    'thumbDown': ThumbDown,
    'thumbUpB': ThumbUpB,
    'thumbDownB': ThumbDownB,
    'episode': Episode
};
console.log(imgs);
const getImage = (key) => imgs[key];

export default getImage;
