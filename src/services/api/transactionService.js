const transactionService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "date" } },
          { field: { Name: "description" } },
          { field: { Name: "category" } },
          { field: { Name: "amount" } },
          { field: { Name: "type" } },
          { field: { Name: "status" } },
          { field: { Name: "invoice_id" } },
          { field: { Name: "reference" } },
          { field: { Name: "department_id" } },
          { field: { Name: "reconciled" } },
          { field: { Name: "payment_method" } },
          { field: { Name: "ai_confidence" } },
          { field: { Name: "attachments" } },
          { field: { Name: "client" } },
          { field: { Name: "client_id" } },
          { field: { Name: "vendor_id" } }
        ]
      };

      const response = await apperClient.fetchRecords('transaction', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  async getById(id) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid ID: must be a positive integer');
    }

    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "date" } },
          { field: { Name: "description" } },
          { field: { Name: "category" } },
          { field: { Name: "amount" } },
          { field: { Name: "type" } },
          { field: { Name: "status" } },
          { field: { Name: "invoice_id" } },
          { field: { Name: "reference" } },
          { field: { Name: "department_id" } },
          { field: { Name: "reconciled" } },
          { field: { Name: "payment_method" } },
          { field: { Name: "ai_confidence" } },
          { field: { Name: "attachments" } },
          { field: { Name: "client" } },
          { field: { Name: "client_id" } },
          { field: { Name: "vendor_id" } }
        ]
      };

      const response = await apperClient.getRecordById('transaction', id, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching transaction with ID ${id}:`, error);
      throw error;
    }
  },

  async create(transactionData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Filter to only include Updateable fields
      const updateableData = {
        Name: transactionData.Name,
        Tags: transactionData.Tags,
        Owner: transactionData.Owner,
        date: transactionData.date,
        description: transactionData.description,
        category: transactionData.category,
        amount: transactionData.amount,
        type: transactionData.type,
        status: transactionData.status,
        invoice_id: transactionData.invoice_id,
        reference: transactionData.reference,
        department_id: transactionData.department_id,
        reconciled: transactionData.reconciled,
        payment_method: transactionData.payment_method,
        ai_confidence: transactionData.ai_confidence,
        attachments: transactionData.attachments,
        client: transactionData.client,
        client_id: transactionData.client_id,
        vendor_id: transactionData.vendor_id
      };

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.createRecord('transaction', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to create transaction');
        }
        return response.results[0].data;
      }

      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  async update(id, transactionData) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid ID: must be a positive integer');
    }

    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Filter to only include Updateable fields plus Id
      const updateableData = {
        Id: id,
        Name: transactionData.Name,
        Tags: transactionData.Tags,
        Owner: transactionData.Owner,
        date: transactionData.date,
        description: transactionData.description,
        category: transactionData.category,
        amount: transactionData.amount,
        type: transactionData.type,
        status: transactionData.status,
        invoice_id: transactionData.invoice_id,
        reference: transactionData.reference,
        department_id: transactionData.department_id,
        reconciled: transactionData.reconciled,
        payment_method: transactionData.payment_method,
        ai_confidence: transactionData.ai_confidence,
        attachments: transactionData.attachments,
        client: transactionData.client,
        client_id: transactionData.client_id,
        vendor_id: transactionData.vendor_id
      };

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.updateRecord('transaction', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to update transaction');
        }
        return response.results[0].data;
      }

      return response.data;
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  },

  async delete(id) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid ID: must be a positive integer');
    }

    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord('transaction', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to delete transaction');
        }
        return true;
      }

      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  }
};

export default transactionService