'use client';
import Image from 'next/image';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from 'yet-another-react-lightbox';
import React from 'react';

function isNextJsImage(slide) {
  return (
    isImageSlide(slide) &&
        typeof slide.width === 'number' &&
        typeof slide.height === 'number'
  );
}

const NextJSImage = ({ slide, offset, rect }) => {

  console.log('asljdn lkna sldnlisda', slide, offset, rect);

  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if(!isNextJsImage(slide)) return undefined;

  const width = !cover
    ? Math.round(
      Math.min(rect.width, (rect.height / slide.height) * slide.width),
    )
    : rect.width;

  const height = !cover
    ? Math.round(
      Math.min(rect.height, (rect.width / slide.width) * slide.height),
    )
    : rect.height;


  return (
      <div style={{ position: 'relative', width, height }}>
          <img
              // fill
              alt=""
              src={process.env.NEXT_PUBLIC_CF_R2_ENDPOINT + '/' + slide}
              loading="eager"
              draggable={false}
              placeholder={slide.blurDataURL ? 'blur' : undefined}
              style={{
                objectFit: cover ? 'cover' : 'contain',
                cursor: click ? 'pointer' : undefined,
              }}
              sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
              onClick={offset === 0 ? () => click?.({ index: currentIndex }) : undefined}
          />
      </div>
  );
};

const Gallery = ({ images }) => {
  
  // const [open, setOpen] = useState(false);
  // const [index, setIndex] = useState(0);
    
  return (
      <div>
          <div className="text-primary text-xl font-semibold mt-12 mb-2 pb-2 justify-between flex items-center">
              <div>Image Gallery</div>
          </div>
          <div className="grid grid-cols-4 gap-2">
              {images?.map((photo: string, index: number) => (
                  <Image
                      // onClick={() => {
                      //   setIndex(index);
                      //   setOpen(true);
                      //{/*}}*/}
                      key={index}
                      src={process.env.NEXT_PUBLIC_CF_R2_ENDPOINT + '/' + photo}
                      className="rounded-lg w-full h-auto cursor-pointer"
                      alt="Gallery"
                      height={300}
                      width={400}
                  />
              ))}
          </div>
          {/*<Lightbox*/}
          {/*    open={open}*/}
          {/*    close={() => setOpen(false)}*/}
          {/*    index={index}*/}
          {/*    slides={images}*/}
          {/*    // render={{ slide: NextJSImage, thumbnail: NextJSImage }}*/}
          {/*    // plugins={images}*/}
          {/*/>*/}
      </div>
  );
};

export default Gallery;