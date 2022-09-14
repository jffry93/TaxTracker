import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

// Import any actions required for transformations.
import { fill } from '@cloudinary/url-gen/actions/resize';

const DisplayImg = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dcfqlsnzh',
    },
  });

  const myImage = cld.image(
    'http://res.cloudinary.com/dcfqlsnzh/image/upload/v1662945218/gwskgyj1xhqso5rsrrky.pdf'
  );
  myImage.resize(fill().width(250).height(250));

  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  );
};

export default DisplayImg;
