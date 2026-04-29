import React, { useMemo } from "react";
import { ActivityIndicator, FlatList, ListRenderItemInfo } from "react-native";
import { PlotsCard } from "./PlotCard";
import { Box, Text } from "@components";
import { IHectare, useGetAllHectares } from "@domain";
import { useTranslation } from "react-i18next";
import { useDebounce } from "src/hooks/useDebounce";

interface PlotsListProps {
  searchQuery?: string;
}

const PlotsList = ({ searchQuery }: PlotsListProps) => {
  const debouncedSearch = useDebounce(searchQuery);

  const {
    data: plotList,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    refresh,
    isFetchingNextPage,
  } = useGetAllHectares(debouncedSearch);

  const { t } = useTranslation();

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
      <Box justifyContent="center" alignItems="center" height={500}>
        <ActivityIndicator size="large" />
      </Box>
    );
  }

  return (
    <FlatList
      data={(plotList as IHectare[]) || []}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 80, marginTop: 10 }}
      renderItem={renderItem}
      onEndReached={handleFetchNextPage}
      onEndReachedThreshold={0.1}
      refreshing={isRefetching}
      onRefresh={refresh}
      ListEmptyComponent={
        <Box height={500} alignItems="center" justifyContent="center">
          <Text color="primary" fontSize={20}>
            {t("plots.none_found")}
          </Text>
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
