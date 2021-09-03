import { Button, Drawer } from "antd";
import React from "react";

export const ProjectModal = (props: { projectModalOpen: boolean, onClose: () => void }) => {
  return <Drawer onClose={props.onClose} visible={props.projectModalOpen} width={'100%'}>
    <span>Project Modal</span>
    <Button onClick={props.onClose}>关闭</Button>
  </Drawer>
}