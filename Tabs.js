import React from 'react';
import styled from 'styled-components';
import useForceRender from './useForceRerender';

const Tabs = ({ defaultActiveKey, children }) => {
  const [localActiveKey, setLocalActiveKey] = React.useState(defaultActiveKey || controls[0]);
  const [scrollSpace, setScrollSpace] = React.useState(0);
  const [holdingMousedownDirection, setHoldingMousedownDirection] = React.useState('');
  const forceRender = useForceRender();

  const holdingDownInterval = React.useRef(null);

  React.useEffect(() => {
    if (!holdingDownInterval) return;

    holdingDownInterval.current = setInterval(() => {
      switch (holdingMousedownDirection) {
        case 'left':
          return scrollStepLeft();
        case 'right':
          return scrollStepRight();
        default:
          return;
      }
    }, 100)

    return () => clearInterval(holdingDownInterval.current)
  }, [holdingMousedownDirection])

  const activeChild = Array.isArray(children)
    && children.find(child => {
      return child.key === localActiveKey;
    });

  const controlsRef = React.useRef({});

  const scrollStepLeft = () => {
    controlsRef.current.scrollLeft -= controlsRef.current.offsetWidth / 10
    forceRender()
  }

  const scrollStepRight = () => {
    controlsRef.current.scrollLeft += controlsRef.current.offsetWidth / 10
    forceRender()
  }

  const handleMousedown = direction => () => setHoldingMousedownDirection(direction)

  const handleMouseup = () => {
    setHoldingMousedownDirection(null)
    clearInterval(holdingDownInterval.current);
  }

  return (
    <Wrapper>
      <div className="controls-wrapper">
        <div className="controls" ref={ref => {
          if (!ref) return;

          setScrollSpace(ref.scrollWidth - ref.offsetWidth)
          controlsRef.current = ref
        }}>
          {
            controlsRef.current.scrollLeft > 0 &&
            <button
              className="scroll-control"
              onClick={scrollStepLeft}
              onMouseDown={handleMousedown('left')}
              onMouseUp={handleMouseup}
            >
              👈🏾
            </button>
          }
          {
            React.Children.map(children, child => (
              <button
                onClick={child.props.onClick || (() => setLocalActiveKey(child.key))}
                key={child.key}
                className={child.key === localActiveKey ? 'tab active': 'tab'}
              >
                {
                  React.isValidElement(child.props.tab)
                  ? child.props.tab
                  : null
                }
              </button>
            ))
          }
          {
            scrollSpace > 0 && controlsRef.current.scrollLeft < scrollSpace &&
            <button
              className="scroll-control"
              onClick={scrollStepRight}
              onMouseDown={handleMousedown('right')}
              onMouseUp={handleMouseup}
            >
              👉🏾
            </button>
          }
        </div>
      </div>
      { activeChild }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  .controls-wrapper {
    overflow: hidden;
    transform: translate3d(0, 0, 0);
  }

  .controls {
    display: flex;
    overflow-x: hidden;

    button {
      width: 100%;
      border: none;
      background: none;
      border-right: 1px solid rgba(0,0,0,.1);
      margin: 10px 0;
      padding: 0;
      cursor: pointer;
      position: relative;
      z-index: 0;
      outline: none;

      &.scroll-control {
        position: fixed;
        background: red;
        left: 0px;
        width: 50px;
        z-index: 1;
        font-size: 20px;
        line-height: 36px;
        background: rgb(255,255,255);
        background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 59%, rgba(255,255,255,0) 85%);

        &:last-of-type {
          left: auto;
          right: 0px;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 100%);
        }
      }

      &.tab:last-of-type {
        border-right: none;
      }

      &.active {
        font-weight: 300;
        color: white;

        &:before {
          content: "";
          display: block;
          width: 80%;
          height: 100%;
          background: #EC407A;
          position: absolute;
          left: 10%;
          z-index: -1;
          border-radius: 5px;
        }
      }

      &:focus:not(.active) {
        color: #fff;

        &:before {
            content: "";
            display: block;
            width: 80%;
            height: 100%;
            background: #ec407a78;
            position: absolute;
            left: 10%;
            z-index: -1;
            border-radius: 5px;
          }
      }
    }
  }
`

Tabs.defaultProps = {
  children: []
}

const TabPane = ({ isActive, children }) => {
  return (
    React.cloneElement(children, { ...children.props, isActive })
  )
}

Tabs.TabPane = TabPane;

export default Tabs;
