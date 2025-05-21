import { UserAchievementCard } from "@/components/card/UserAchievementCard";
import Loading from "@/components/common/Loading";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useAchievement } from "@/hooks/useAchievement";
import { useTopCardUsers, useTopStreakUsers } from "@/hooks/useRanking";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import MotivationCard from "./components/MotivationCard";
import { RankingCard } from "./components/RankingCard";
import { StatsCard } from "./components/StatsCard";
import { TabNavigation } from "./components/TabNavigation";
import { TopThreeShowcase } from "./components/TopThreeShowcase";

const UserRankingPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("streak");

  const { data: achievements, isLoading: isAchievementsLoading } = useAchievement();
  const { data: user, isLoading: isUserLoading } = useUserProfile();
  const { data: topStreakUsers, isLoading: isTopStreakUsersLoading } = useTopStreakUsers();
  const { data: topCardUsers, isLoading: isTopCardUsersLoading } = useTopCardUsers();

  if (isTopStreakUsersLoading || isTopCardUsersLoading || isAchievementsLoading || isUserLoading) {
    return <Loading message={t("userRanking.loading")} />;
  }

  return (
    <div className="min-h-screen md:py-8 py-12 xl:px-2 px-4">
      <div className="xl:px-5 px-0 grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4 order-1 xl:order-2 flex flex-col gap-1">
          <MotivationCard />
          <UserAchievementCard
            username={user?.data?.username ?? ""}
            name={user?.data?.name ?? ""}
            avatar={user?.data?.avatar ?? ""}
            achievements={achievements ?? []}
          />
        </div>
        <div className="xl:col-span-8 order-2 xl:order-1 pb-8 md:pb-0">
          <div className="lg:col-span-8">
          {/* <Header /> */}
          <Tabs
            defaultValue="streak"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabNavigation activeTab={activeTab} />
            <div className="mb-8">
              {activeTab === "streak" && (
                <TopThreeShowcase
                  data={topStreakUsers?.data ?? []}
                  type="streak"
                />
              )}
              {activeTab === "cards" && (
                <TopThreeShowcase
                  data={topCardUsers?.data ?? []}
                  type="cards"
                />
              )}
            </div>
            <TabsContent value="streak" className="pt-4">
              <RankingCard
                data={topStreakUsers?.data?.filter((user) => user.streak > 0) ?? []}
                type="streak"
                isLoading={isTopStreakUsersLoading}
              />
            </TabsContent>
            <TabsContent value="cards" className="pt-4">
              <RankingCard
                data={topCardUsers?.data ?? []}
                type="cards"
                isLoading={isTopCardUsersLoading}
              />
            </TabsContent>
          </Tabs>
          <div className="mt-10">
            <StatsCard
              streakData={topStreakUsers?.data ?? []}
              cardCountData={topCardUsers?.data ?? []}
            />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRankingPage;