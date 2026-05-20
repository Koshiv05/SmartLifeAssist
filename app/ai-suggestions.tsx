import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCallback, useState } from 'react';

import { useAppContext } from '../contexts/AppContext';
import { generateTaskSuggestion } from '../services/aiService';

type Suggestion = {
  id: string;
  text: string;
};

export default function AiSuggestionsScreen() {
  const { tasks } = useAppContext();

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function generateSuggestions() {
        try {
          setLoading(true);

          const generatedSuggestions: Suggestion[] = [];

          if (tasks.length === 0) {
            generatedSuggestions.push({
              id: '1',
              text: 'No tasks found. Add tasks to receive AI productivity suggestions.',
            });
          } else {
            // Generate suggestions for latest tasks
            const limitedTasks = tasks.slice(0, 3);

            for (const task of limitedTasks) {
              const aiText = await generateTaskSuggestion(
                task.title
              );

              generatedSuggestions.push({
                id: task.id,
                text: aiText,
              });
            }
          }

          setSuggestions(generatedSuggestions);
        } catch (error) {
          console.log('AI suggestion error:', error);

          setSuggestions([
            {
              id: 'error',
              text: 'Could not generate AI suggestions at this time.',
            },
          ]);
        } finally {
          setLoading(false);
        }
      }

      generateSuggestions();
    }, [tasks])
  );

  function handleAcceptSuggestion(text: string) {
    Alert.alert(
      'Suggestion Accepted',
      text
    );
  }

  function handleIgnoreSuggestion() {
    Alert.alert(
      'Suggestion Ignored',
      'Suggestion has been ignored.'
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>
            AI Suggestions
          </Text>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#9C27B0"
              style={{ marginTop: 40 }}
            />
          ) : (
            suggestions.map((suggestion) => (
              <View
                key={suggestion.id}
                style={styles.card}
              >
                <Text style={styles.suggestionText}>
                  {suggestion.text}
                </Text>

                <View style={styles.actionRow}>
                  <Pressable
                    style={styles.acceptButton}
                    onPress={() =>
                      handleAcceptSuggestion(
                        suggestion.text
                      )
                    }
                  >
                    <Text style={styles.buttonText}>
                      ACCEPT
                    </Text>
                  </Pressable>

                  <Pressable
                    style={styles.ignoreButton}
                    onPress={handleIgnoreSuggestion}
                  >
                    <Text style={styles.buttonText}>
                      IGNORE
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.bottomButtons}>
          <Pressable
            style={styles.backButton}
            onPress={() =>
              router.replace('/' as any)
            }
          >
            <Text style={styles.backButtonText}>
              BACK TO DASHBOARD
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const PURPLE = '#9C27B0';
const GREEN = '#4CAF50';
const RED = '#E53935';
const LIGHT_BG = '#F2F2F2';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: LIGHT_BG,
  },

  container: {
    flex: 1,
    backgroundColor: LIGHT_BG,
  },

  topBar: {
    width: '100%',
    backgroundColor: PURPLE,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },

  topBarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },

  suggestionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#222',
  },

  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },

  acceptButton: {
    flex: 1,
    backgroundColor: GREEN,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },

  ignoreButton: {
    flex: 1,
    backgroundColor: RED,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

  bottomButtons: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
  },

  backButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#90CAF9',
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
  },

  backButtonText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '700',
  },
});