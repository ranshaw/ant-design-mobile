import React, { FC, ReactNode, useState } from 'react'
import { mergeProps } from '../../utils/with-default-props'
import classNames from 'classnames'
import { useIsomorphicLayoutEffect, useUnmountedRef } from 'ahooks'
import Mask from '../mask'
import type { MaskProps } from '../mask'
import { Action, DialogActionButton } from './dialog-action-button'
import Image from '../image'
import {
  GetContainer,
  renderToContainer,
} from '../../utils/render-to-container'
import {
  PropagationEvent,
  withStopPropagation,
} from '../../utils/with-stop-propagation'
import AutoCenter from '../auto-center'
import { useSpring, animated } from '@react-spring/web'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { ShouldRender } from '../../utils/should-render'
import { useInnerVisible } from '../../utils/use-inner-visible'

export type DialogProps = {
  afterClose?: () => void
  afterShow?: () => void
  image?: string
  header?: ReactNode
  // waitImageLoad?: boolean
  title?: ReactNode
  content?: ReactNode
  actions?: (Action | Action[])[]
  onAction?: (action: Action, index: number) => void | Promise<void>
  closeOnAction?: boolean
  onClose?: () => void
  closeOnMaskClick?: boolean
  visible?: boolean
  getContainer?: GetContainer
  bodyStyle?: React.CSSProperties
  bodyClassName?: string
  maskStyle?: MaskProps['style']
  maskClassName?: string
  stopPropagation?: PropagationEvent[]
  disableBodyScroll?: boolean
  destroyOnClose?: boolean
  forceRender?: boolean
} & NativeProps

const defaultProps = {
  visible: false,
  actions: [] as Action[],
  closeOnAction: false,
  closeOnMaskClick: false,
  stopPropagation: ['click'],
  getContainer: null,
  disableBodyScroll: true,
  destroyOnClose: false,
  forceRender: false,
}

export const Dialog: FC<DialogProps> = p => {
  const props = mergeProps(defaultProps, p)

  const unmountedRef = useUnmountedRef()
  const style = useSpring({
    scale: props.visible ? 1 : 0.8,
    opacity: props.visible ? 1 : 0,
    config: {
      mass: 1.2,
      tension: 200,
      friction: 25,
      clamp: true,
    },
    onRest: () => {
      if (unmountedRef.current) return
      setActive(props.visible)
      if (props.visible) {
        props.afterShow?.()
      } else {
        props.afterClose?.()
      }
    },
  })

  const [active, setActive] = useState(props.visible)
  useIsomorphicLayoutEffect(() => {
    if (props.visible) {
      setActive(true)
    }
  }, [props.visible])

  const maskVisible = useInnerVisible(active && props.visible)

  const body = (
    <div
      className={classNames(
        cls('body'),
        props.image && cls('with-image'),
        props.bodyClassName
      )}
      style={props.bodyStyle}
    >
      {!!props.image && (
        <div className={cls('image-container')}>
          <Image src={props.image} alt='dialog header image' width='100%' />
        </div>
      )}
      {!!props.header && (
        <div className={cls('header')}>
          <AutoCenter>{props.header}</AutoCenter>
        </div>
      )}
      {!!props.title && <div className={cls('title')}>{props.title}</div>}
      <div
        className={classNames(
          cls('content'),
          !props.content && cls('content-empty')
        )}
      >
        {typeof props.content === 'string' ? (
          <AutoCenter>{props.content}</AutoCenter>
        ) : (
          props.content
        )}
      </div>
      <div className={cls('footer')}>
        {props.actions.map((row, index) => {
          const actions = Array.isArray(row) ? row : [row]
          return (
            <div className={cls('action-row')} key={index}>
              {actions.map((action, index) => (
                <DialogActionButton
                  key={action.key}
                  action={action}
                  onAction={async () => {
                    await Promise.all([
                      action.onClick?.(),
                      props.onAction?.(action, index),
                    ])
                    if (props.closeOnAction) {
                      props.onClose?.()
                    }
                  }}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )

  const node = withStopPropagation(
    props.stopPropagation,
    withNativeProps(
      props,
      <div
        className={cls()}
        style={{
          display: active ? undefined : 'none',
          pointerEvents: active ? undefined : 'none',
        }}
      >
        <Mask
          visible={maskVisible}
          onMaskClick={props.closeOnMaskClick ? props.onClose : undefined}
          style={props.maskStyle}
          className={classNames(cls('mask'), props.maskClassName)}
          disableBodyScroll={props.disableBodyScroll}
        />
        <div className={cls('wrap')}>
          <animated.div style={style}>{body}</animated.div>
        </div>
      </div>
    )
  )

  return (
    <ShouldRender
      active={active}
      forceRender={props.forceRender}
      destroyOnClose={props.destroyOnClose}
    >
      {renderToContainer(props.getContainer, node)}
    </ShouldRender>
  )
}

function cls(name: string = '') {
  return 'adm-dialog' + (name && '-') + name
}
