import React, { ReactElement } from 'react'
import barWork from './harbor/pub/barWork.jpg'
import waiterWork from './harbor/pub/waiterWork.jpg'

interface iImageMeta {
	name: string,
	profileURL: string,
	originalImageURL: string,
}

interface iImageProps {
	imageUrl: string
	meta: iImageMeta
}

interface iImagesData {
	[key: string]: iImageProps
}

interface iImages {
	[key: string]: ReactElement
}

const Image = (props: iImageProps): ReactElement => {
	const { imageUrl, meta } = props
	return <div >
		<img className='image' src={imageUrl} />
		<br />
		<i><a href={meta.originalImageURL} target='_blank' rel="noreferrer" ><b>Source</b></a> - By: <b><a href={meta.profileURL} target='_blank' rel="noreferrer" >{meta.name}</a></b></i>
	</div>
}

export const imagesData: iImagesData = {
	pubBarWork: {
		imageUrl: barWork,
		meta: {
			name: 'Kike Salazar N',
			profileURL: 'https://unsplash.com/@kikesalazarn',
			originalImageURL: 'https://unsplash.com/photos/YXE6VyUQisk'
		}
	},
	pubWaiterWork: {
		imageUrl: waiterWork,
		meta: {
			name: 'Tallywacker',
			profileURL: 'https://www.instagram.com/tallywackersofficial/?hl=en',
			originalImageURL: 'https://www.instagram.com/p/6nhFcCPiuW/'
		}
	}
}

export const images: iImages = {
	pubBarWork: <Image {...imagesData.pubBarWork} />,
	pubWaiterWork: <Image {...imagesData.pubWaiterWork} />
}

export default Image
