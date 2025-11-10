import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router-dom";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon, School, GitBranch } from "lucide-react";

import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import SearchFilters from "../components/SearchFilters";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const [searchParams, setSearchParams] = useState({});

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users", searchParams],
    queryFn: () => getRecommendedUsers(searchParams),
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Welcome to EduConnect
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with like-minded learners, build meaningful relationships, and grow together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" asChild>
                <Link to="/notifications">
                  <UsersIcon className="mr-2 size-5" />
                  Friend Requests
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/friends">
                  View All Friends
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 space-y-16">
        {/* Friends Section */}
        {friends.length > 0 && (
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Your Learning Circle</h2>
              <p className="text-muted-foreground">Stay connected with your study partners</p>
            </div>
            
            {loadingFriends ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {friends.slice(0, 4).map((friend) => (
                  <FriendCard key={friend._id} friend={friend} />
                ))}
              </div>
            )}
            
            {friends.length > 4 && (
              <div className="text-center">
                <Button variant="outline" asChild>
                  <Link to="/friends">View All {friends.length} Friends</Link>
                </Button>
              </div>
            )}
          </section>
        )}

        {/* Discover Section */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Discover New Connections</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find study partners who share your interests and academic goals
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <SearchFilters
              onSearch={(search) => setSearchParams(prev => ({ ...prev, search }))}
              onFilter={(filters) => setSearchParams(prev => ({ ...prev, ...filters }))}
            />
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <Card className="max-w-md mx-auto text-center border-dashed">
              <CardContent className="p-8">
                <UsersIcon className="size-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No recommendations yet</h3>
                <p className="text-muted-foreground">Check back later for new study partners!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <Card key={user._id} className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/20">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                            <AvatarImage src={user.profilePic} alt={user.fullName} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                              {user.fullName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg truncate">{user.fullName}</h3>
                            {user.location && (
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPinIcon className="size-3 mr-1 flex-shrink-0" />
                                <span className="truncate">{user.location}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {user.college && (
                            <Badge variant="secondary" className="text-xs">
                              <School className="size-3 mr-1" />
                              {user.college}
                            </Badge>
                          )}
                          {user.branch && (
                            <Badge variant="outline" className="text-xs">
                              <GitBranch className="size-3 mr-1" />
                              {user.branch}
                            </Badge>
                          )}
                        </div>

                        {user.bio && (
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {user.bio}
                          </p>
                        )}

                        <Button
                          className="w-full"
                          onClick={() => sendRequestMutation(user._id)}
                          disabled={hasRequestBeenSent || isPending}
                          variant={hasRequestBeenSent ? "secondary" : "default"}
                        >
                          {hasRequestBeenSent ? (
                            <>
                              <CheckCircleIcon className="size-4 mr-2" />
                              Request Sent
                            </>
                          ) : (
                            <>
                              <UserPlusIcon className="size-4 mr-2" />
                              Connect
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;