import React, { useState } from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";
import "./TableTablesAdmin.scss";
import QRCode from "qrcode.react";
import { ModalBasic } from "../../../common";

export function TableTablesAdmin({ tables, updateTable, onDeleteTable }) {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const showQr = (table) => {
    setContentModal(
      <div style={{ textAlign: "center" }}>
        <QRCode value={`${window.location.origin}/client/${table.number}`} />
      </div>
    );
    openCloseModal();
  };

  return (
    <>
      <Table className="table-tables-admin">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Mesa numero</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {map(tables, (table, index) => (
            <Table.Row key={index}>
              <Table.Cell>{table.number}</Table.Cell>

              <Actions
                table={table}
                updateTable={updateTable}
                onDeleteTable={onDeleteTable}
                showQr={showQr}
              />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="Codigo QR"
        size="mini"
        children={contentModal}
      />
    </>
  );
}

function Actions({ table, updateTable, onDeleteTable, showQr }) {
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => showQr(table)}>
        <Icon name="qrcode" />
      </Button>
      <Button icon onClick={() => updateTable(table)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => onDeleteTable(table)}>
        <Icon name="trash" />
      </Button>
    </Table.Cell>
  );
}
