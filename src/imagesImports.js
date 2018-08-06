import ShowsLogo from './images/img-logo-horizontal@3x.png';
import FacebookLogo from './images/ic-facebook@3x.png';
import LinkedInLogo from './images/ic-linkedin@3x.png';
import TwitterLogo from './images/ic-twitter@3x.png';
import PasswordEye from './images/ic-akcije-show-password-red@3x.png';
import ThumbUp from './images/thumbs-up.png';
import ThumbDown from './images/thumbs-down.png';
import ThumbUpB from './images/thumbs-up-black.png';
import ThumbDownB from './images/thumbs-down-black.png';
import Episode from './images/episode.jpg';
import Plus from './images/plus.png';
import GoBack from './images/go-back.png';
import Heart from './images/heart.png';
import User from './images/img-placeholder-user3.png';
import Photo from './images/photo.png';
import Close from './images/close.png';
import NoImage from './images/icons8-picture-512.png';
import Loader from './images/loader.gif';

const imgs = {
    'logo': ShowsLogo,
    'facebook': FacebookLogo,
    'linkedin': LinkedInLogo,
    'twitter': TwitterLogo,
    'passEye':PasswordEye,
    'thumbUp': ThumbUp,
    'thumbDown': ThumbDown,
    'thumbUpB': ThumbUpB,
    'thumbDownB': ThumbDownB,
    'episode': Episode,
    'plus': Plus,
    'goBack': GoBack,
    'heart': Heart,
    'user': User,
    'close': Close,
    'photo': Photo,
    'noImage': NoImage,
    'loader': Loader
};

const getImage = (key) => imgs[key];

export default getImage;
