const axios = require("axios");

exports.triggerWebhook = async (job) => {
  try {
    const payload = {
      jobId: job.id,
      taskName: job.taskName,
      priority: job.priority,
      payload: JSON.parse(job.payload),
      completedAt: new Date().toISOString(),
    };

    // console.log("🔗 Sending webhook to:", process.env.WEBHOOK_URL);

    const response = await axios.post(process.env.WEBHOOK_URL, payload);

    console.log("Webhook sent:", response.status);
  } catch (error) {
    console.error("Webhook failed:", error.message);
  }
};
