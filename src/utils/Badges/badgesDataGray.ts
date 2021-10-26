import join from '../../assets/badges/0_b.png'
import waste from '../../assets/badges/1_b.png'
import event from '../../assets/badges/2_b.png'
import first from '../../assets/badges/3_b.png'
import second from '../../assets/badges/4_b.png'
import third from '../../assets/badges/5_b.png'
import fourth from '../../assets/badges/6_b.png'
import fifth from '../../assets/badges/7_b.png'
import sixth from '../../assets/badges/8_b.png'

interface IBadge {
    title: string
    txt: string
    img: string
}

interface IAllBadges {
    [key: string]: IBadge
}

export const allBadgesGray: IAllBadges = {
    join: {
        title: 'Join the fight',
        txt: 'Created an account!',
        img: join,
    },
    waste: {
        title: 'Collection point creator',
        txt: 'Created an waste collection point!',
        img: waste,
    },
    event: {
        title: 'Event creator',
        txt: 'Created an Event!',
        img: event,
    },
    first: {
        title: 'Long way to go',
        txt: 'Join your first event!',
        img: first,
    },
    second: {
        title: 'Keeper of nature',
        txt: 'Join your second event!',
        img: second,
    },
    third: {
        title: 'Getting there',
        txt: 'Join your fifth event!',
        img: third,
    },
    fourth: {
        title: 'Care for the environment',
        txt: 'Join your eighth event!',
        img: fourth,
    },
    fifth: {
        title: 'Award winner',
        txt: 'Join your twelfth event!',
        img: fifth,
    },
    sixth: {
        title: 'Captain Planet',
        txt: 'Join your fiftieth event!',
        img: sixth,
    },
}