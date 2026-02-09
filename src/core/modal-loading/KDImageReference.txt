import * as React from 'react';


import { makeStyles,createStyles } from '@mui/styles';
import { Modal,Fade, Skeleton,CircularProgress} from '@mui/material';

import { CSSProperties } from '@mui/styled-engine';
//import { CSSProperties } from '@material-ui/core/styles/withStyles';


const useStyles:any = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
    },
    skeleton: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      pointerEvents: 'auto',
      userSelect: 'auto',
    },
    hiddenModal: {
      display: 'none',
      pointerEvents: 'none',
      userSelect: 'none',
    },
    largeImageContainer: {
      position: 'relative',
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      padding: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

/**
 * KDImage is a React component for displaying images with built-in lazy loading and large modal popover functionality. It also automatically displays skeleton placeholders while an image is being fetched.
 * A different image source can be provided for the main `src` and the larger modal preview, making it convenient to fetch and display a small version and a high resolution version independent from one another. KDImage ensures that its `src` resources are loaded only once as long as the component remains mounted.
 * Currently, it uses Material-UI internally and requires both `@material-ui/core` and `@material-ui/lab` as dependencies.
 * @author Cadence Holmes <{@link https://github.com/justKD|justKD}>
 * @license MIT
 * @component
 * @prop {string | null | undefined} src - The `src` url to be passed to the `<img>`. If `null` or `undefined`, the `<img>` will still be rendered but without contents.
 * @prop {string} [largeSrc] - If different from the `src`, this should be the url to a larger/higher resolution image to be displayed in the popover modal when clicked. The `src` is used if this value is empty.
 * @prop {string} [alt] - The `alt` string to be passed to the `<img>`. Default is `""`.
 * @prop {string | number} [width] - Each `KDImage` `<img>` is wrapped in a containing `<div>`. This is the CSS `width` value applied to the container. Default is `auto`.
 * @prop {string | number} [height] - Each `KDImage` `<img>` is wrapped in a containing `<div>`. This is the CSS `height` value applied to the container. Default is `auto`.
 * @prop {number} [time] - Fade transition duration in milliseconds. Default is `800`.
 * @prop {boolean} [showSkeleton] - Determines whether the placeholder skeleton will be rendered. Default is `true`.
 * @prop {string} [background] - CSS `background` property for the image container. Potentially useful if the `src` url is initially empty.
 * @prop {() => void} [onclick] - Callback function to be passed as the `onClick` value of the container `<div>`. This will be called AFTER the `KDImage` default `onClick` behavior.
 * @prop {() => void} [onload] - Callback function called when image is loaded.
 * @prop {boolean} [preventDefaultOnClick] - By default, clicking a `KDImage` will open a larger version in a modal popover before calling the `onclick` prop. Set `preventDefaultOnClick` to `true` to skip the default behavior.
 * @prop {string} [objectfit] - CSS `object-fit` property applied to the `<img>`. Default is `cover`.
 * @prop {string} [objectposition] - CSS `object-position` value applied to the `<img>`. Default is `center`.
 * @requires react
 * @requires @material-ui/core
 * @requires @material-ui/lab
 * @example
 * <KDImage src={url} width={150} />
 */
export const KDImageReference = ({
  src,
  largeSrc,
  alt,
  width,
  height,
  time,
  showSkeleton,
  onclick,
  onload,
  preventDefaultOnClick,
  objectfit,
  objectposition,
  background,
}: {
  src: string | undefined;
  largeSrc?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  time?: number;
  showSkeleton?: boolean;
  onclick?<T extends unknown[], R = unknown>(...args: T): R | void;
  onload?<T extends unknown[], R = unknown>(...args: T): R | void;
  preventDefaultOnClick?: boolean;
  objectfit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  objectposition?: string;
  background?: string;
}): React.ReactElement => {
  //
  const classes = useStyles();
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [showImgSkeleton, setShowImageSkeleton] = React.useState(true);
  const [showBigImage, setShowBigImage] = React.useState(false);
  const [bigImgLoaded, setBigImgLoaded] = React.useState(false);

  const smallImageRef = React.useRef<HTMLImageElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);

  /**
   *  Resolve to props or defaults
   */
  const props: {
    time: number;
    alt: string;
    showSkeleton: boolean;
    preventDefaultOnClick: boolean;
    width: CSSProperties['width'];
    height: CSSProperties['height'];
    objectfit: CSSProperties['objectFit'];
    objectposition: CSSProperties['objectPosition'];
    background: CSSProperties['background'];
  } = React.useMemo(() => {
    return {
      time: time ?? 800,
      alt: alt ?? '',
      showSkeleton: showSkeleton ?? true,
      preventDefaultOnClick: preventDefaultOnClick ?? false,
      width: width ?? 'auto',
      height: height ?? 'auto',
      objectfit: objectfit ?? 'cover',
      objectposition: objectposition ?? 'center',
      background: background ?? 'transparent',
    };
  }, [
    time,
    alt,
    showSkeleton,
    preventDefaultOnClick,
    width,
    height,
    objectfit,
    objectposition,
    background,
  ]);

  /**
   * `IntersectionObserver` manages lazy loading for small image.
   */
  const imageObserver = React.useMemo(() => {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          image.src = image.dataset.src || '';
          imageObserver.unobserve(image);
        }
      });
    });
  }, []);

  /**
   * Add and remove small image lazy load observer.
   */
  React.useEffect(() => {
    const image = smallImageRef?.current;
    const available = image && 'IntersectionObserver' in window;
    const loaded = image?.src;
    if (image && available && !loaded) imageObserver.observe(image);
    return () => imageObserver.disconnect();
  }, [imageObserver]);

  /**
   * Handle built-in click behavior for small image. This will set the modal state to open.
   *
   * On first click, the modal mounts its children and begins loading the large image src.
   * Once downloaded, `bigImageLoaded` is set to `true`, which flags the modal prop
   * `keepMounted` to true, retaining the downloaded resources even when the modal is closed.
   * If `keepMounted` is initially set to `true`, then the large image resources will download
   * as soon as the dom is ready instead of only when the small image is clicked. If `keepMounted`
   * is `false` even after the large image resource is downloaded, every subsequent time the modal
   * is opened it will redownload the resource.
   */
  const onclickImage = React.useCallback(() => {
    const prevent = props.preventDefaultOnClick;
    if (!prevent) setShowBigImage(true);
    if (onclick) onclick();
  }, [props.preventDefaultOnClick, onclick]);

  /**
   *  Small <img />
   */
  const Image = React.useMemo(() => {
    return (
      <img
        ref={smallImageRef}
        data-src={src}
        style={{
          height: '100%',
          width: '100%',
          objectFit:  props.objectfit,
          objectPosition: props.objectposition,
        }}
        alt={props.alt}
        onLoad={() => {
          setImgLoaded(true);
          if (onload) onload();
        }}
      />
    );
  }, [src, props.alt, props.objectfit, props.objectposition, onload]);

  /**
   *  Large <img />
   */
  const LargeImage = React.useMemo(() => {
    return (
      <img
        src={largeSrc || src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
        alt={alt || ''}
        onLoad={() => setBigImgLoaded(true)}
      />
    );
  }, [alt, largeSrc, src]);

  /**
   * Fade in small image
   */
  const ImageLoader = React.useMemo(() => {
    return (
      <Fade
        in={imgLoaded}
        timeout={time}
        onEnter={() => setShowImageSkeleton(false)}
      >
        {Image}
      </Fade>
    );
  }, [Image, imgLoaded, time]);

  /**
   *  Small image skeleton placeholders
   */
  const ImageSkeletons = React.useMemo(() => {
    return (
      props.showSkeleton && (
        <Fade
          in={showImgSkeleton}
          timeout={{ enter: 0, exit: time || props.time }}
          mountOnEnter
          unmountOnExit
        >
          <Skeleton
            variant='rect'
            animation='wave'
            className={classes.skeleton}
          />
        </Fade>
      )
    );
  }, [props.showSkeleton, showImgSkeleton, time, props.time, classes.skeleton]);

  /**
   *  Popover modal for large image
   */
  const LargeImageModal = React.useMemo(() => {
    return (
      <Modal
        ref={modalRef}
        aria-labelledby='KDImage-large-image-modal'
        aria-describedby='Lazy load popover modal image view.'
        className={classes.modal}
        open={showBigImage}
        
        keepMounted={bigImgLoaded}
      >
        <Fade
          in={showBigImage}
          timeout={{ enter: props.time, exit: props.time / 4 }}
        >
          <div className={classes.largeImageContainer}>
            <Fade in={bigImgLoaded} timeout={props.time}>
              {LargeImage}
            </Fade>
            <Fade
              in={!bigImgLoaded}
              timeout={props.time}
              mountOnEnter
              unmountOnExit
            >
              <div style={{ position: 'absolute' }}>
                <CircularProgress
                  style={{
                    color: 'white',
                  }}
                />
              </div>
            </Fade>
          </div>
        </Fade>
      </Modal>
    );
  }, [
    LargeImage,
    bigImgLoaded,
    showBigImage,
    classes.modal,
    classes.largeImageContainer,
    props.time,
  ]);

  return (
    <div
      className={classes.root}
      style={{
        width: props.width,
        height: props.height,
        background: props.background,
      }}
    >
      {src && (
        <div style={{ height: '100%', width: '100%' }} onClick={onclickImage}>
          {ImageLoader}
          {ImageSkeletons}
        </div>
      )}
      {LargeImageModal}
    </div>
  );
};
