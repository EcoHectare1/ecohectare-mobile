import React from "react";
import { View, FlatList, ListRenderItemInfo } from "react-native";
import { PlotsCard, PlotsCardProps } from "./PlotCard";

const data = [
  {
    id: "1",
    code: "A1",
    title: "Loteamento Nhamundá",
    subtitle: "Dona Auxiliadora",
    lat: -3.4653,
    lng: -62.2139,
    price: 10.5,
  },
  {
    id: "2",
    code: "B2",
    title: "Residencial Aruã",
    subtitle: "Novo Horizonte",
    lat: -2.9432,
    lng: -60.1123,
    price: 12.0,
  },
  {
    id: "3",
    code: "C3",
    title: "Condomínio Monte Verde",
    subtitle: "Centro",
    lat: -3.1021,
    lng: -59.9874,
    price: 15.75,
  },
  {
    id: "4",
    code: "D4",
    title: "Jardim das Palmeiras",
    subtitle: "Bairro Sul",
    lat: -3.2893,
    lng: -60.7894,
    price: 9.9,
  },
  {
    id: "5",
    code: "E5",
    title: "Residencial Santa Rita",
    subtitle: "Vila Esperança",
    lat: -3.5567,
    lng: -62.0012,
    price: 11.3,
  },
];

const PlotsList = () => {
  function renderItem({ item }: ListRenderItemInfo<PlotsCardProps>) {
    return <PlotsCard {...item} />;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(_, idx) => idx.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30, marginTop: 16 }}
      renderItem={renderItem}
    />
  );
};

export default PlotsList;
