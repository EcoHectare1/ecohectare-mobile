import React from "react";
import { ActivityIndicator, FlatList, ListRenderItemInfo } from "react-native";
import { PlotsCard } from "./PlotCard";
import { Box, Text } from "@components";
import { IHectare, useGetAllHectares } from "@domain";

const PlotsList = () => {
  const {
    data: plotList,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    refresh,
    isFetchingNextPage,
  } = useGetAllHectares(1);

  function renderItem({ item }: ListRenderItemInfo<IHectare>) {
    return <PlotsCard item={item} />;
  }

  function handleFetchNextPage() {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );
  }

  return (
    <FlatList
      data={(plotList as IHectare[]) || []}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 80, marginTop: 60 }}
      renderItem={renderItem}
      onEndReached={handleFetchNextPage}
      onEndReachedThreshold={0.1}
      refreshing={isRefetching}
      onRefresh={refresh}
      ListEmptyComponent={
        <Box alignItems="center" justifyContent="center">
          <Text>Nenhum terreno encontrado.</Text>
        </Box>
      }
      ListFooterComponent={
        isFetchingNextPage ? (
          <Box paddingVertical={"s24"}>
            <ActivityIndicator size="large" />
          </Box>
        ) : null
      }
    />
  );
};

export default PlotsList;
